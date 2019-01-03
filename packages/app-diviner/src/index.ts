/*
 * @Author: XY | The Findables Company <ryanxyo>
 * @Date:   Wednesday, 19th December 2018 12:56:51 pm
 * @Email:  developer@xyfindables.com
 * @Filename: index.ts
 * @Last modified by: ryanxyo
 * @Last modified time: Thursday, 3rd January 2019 2:17:25 pm
 * @License: All Rights Reserved
 * @Copyright: Copyright XY | The Findables Company
 */

import { XyoBase } from '@xyo-network/base'
import createDivinerGraphqlServer from '@xyo-network/diviner-graphql-api'
import { XyoGraphQLServer } from '@xyo-network/graphql-server'
import { XyoAboutDiviner } from '@xyo-network/about-diviner'
import { IXyoSCSCDescriptionProvider } from '@xyo-network/scsc'
import { XyoMetaList, XyoMeta } from '@xyo-network/meta-list'
import { XyoQuestionService, IXyoHasIntersectedQuestion, IXyoQuestionService, QuestionsWorker } from '@xyo-network/questions'
import { IXyoDivinerArchivistClient } from '@xyo-network/diviner-archivist-client'
import { XyoDivinerArchivistGraphQLClient } from '@xyo-network/diviner-archivist-client.graphql'
import { XyoIpfsClient, IXyoIpfsClient } from '@xyo-network/ipfs-client'
import { XyoWeb3Service } from '@xyo-network/web3-service'
import { Web3QuestionService } from '@xyo-network/web3-question-service'
import { IDivinerLauncherConfig } from './@types'

class DivinerLauncher extends XyoBase {

  public server: XyoGraphQLServer | undefined

  constructor (private readonly divinerConfig: IDivinerLauncherConfig) {
    super()
  }

  public async start() {
    const scsc = await this.getScscDataProvider().resolve()

    this.server = await createDivinerGraphqlServer(
      // The port to run the graphql server on
      this.divinerConfig.graphQLPort,

      // The `about me` data-provider
      async () => {
        return new XyoAboutDiviner(
          this.divinerConfig.about.version,
          this.divinerConfig.about.url,
          this.divinerConfig.about.address,
          this.divinerConfig.about.seeds,
          scsc
        )
      },

      // Provides a list archivists this diviner knows about
      async () => {
        return new XyoMetaList(
          new XyoMeta(
            this.divinerConfig.about.seeds.archivists.length,
            undefined,
            false
          ),
          this.divinerConfig.about.seeds.archivists
        )
      },
      {
        resolve: (args: IXyoHasIntersectedQuestion) => {
          return this.getQuestionsService()
            .havePartiesIntersected(args)
        }
      }
    )

    this.server.start()

    const web3Service = new XyoWeb3Service(
      this.divinerConfig.web3.host,
      this.divinerConfig.about.ethAddress,
      this.divinerConfig.ethereumContracts
    )
    const web3QuestionService = new Web3QuestionService(web3Service)
    const worker = new QuestionsWorker(web3QuestionService, this.getQuestionsService())
    worker.start()
  }

  public async stop() {
    if (this.server) {
      await this.server.stop()
    }

    return
  }

  public getQuestionsService(): IXyoQuestionService {
    return this.getOrCreate('QuestionsService', () => {
      return new XyoQuestionService(
        this.getDivinerArchivistClient()
      )
    })
  }

  public getDivinerArchivistClient(): IXyoDivinerArchivistClient {
    return this.getOrCreate('IXyoDivinerArchivistClient', () => {
      if (this.divinerConfig.about.seeds.archivists.length === 0) {
        throw new Error('At least one archivist seed is required')
      }

      return new XyoDivinerArchivistGraphQLClient(this.divinerConfig.about.seeds.archivists[0])
    })
  }

  public getIpfsClient(): IXyoIpfsClient {
    return this.getOrCreate('XyoIpfsClient', () => {
      return new XyoIpfsClient(this.divinerConfig.ipfs)
    })
  }

  public getScscDataProvider(): IXyoSCSCDescriptionProvider {
    return this.getOrCreate('IXyoSCSCDescriptionProvider', () => {

      return {
        resolve: async () => {
          const ipfsClient = this.getIpfsClient()
          const files = await ipfsClient.readFiles(this.divinerConfig.stakedConsensus.ipfsHash)

          if (!files || files.length !== 1) {
            this.logError(
              `Undetermined state: Must return one and only one file for ipfs path ${this.divinerConfig.stakedConsensus.ipfsHash}`
            )
            throw new Error('TODO: refactor to proper xyo-error once extracted into correct module')
          }

          const result = JSON.parse(files[0].toString())

          return {
            address: '',
            platform: 'ethereum',
            network: 'kovan',
            abi: JSON.stringify(result.abi),
            bytecode: result.bytecode,
            ipfs: this.divinerConfig.stakedConsensus.ipfsHash
          }
        }
      }
    })
  }
}
export async function main(args: string[]) {
  let config: any | undefined
  try {
    config = await import('./configuration')
  } catch (e) {
    console.error('There was an error during start-up, will exit', e)
    process.exit(-1)
  }

  XyoBase.logger.info(`Launching archivist with config\n${JSON.stringify(config, null, 2)}`)
  const launcher = new DivinerLauncher(config.default)
  await launcher.start()
}

if (require.main === module) {
  main(process.argv)
}
