import { ApolloServer, gql, Config, CorsOptions } from 'apollo-server'
import { IResolvers } from 'graphql-tools'
import scscInfoResolvers from './SCSCInfo/resolvers'
import listResolvers from './list/resolvers'
import blockResolvers from './scsc/block/resolvers'
import { importSchema } from 'graphql-import'
import Block from './scsc/block'
import { IntersectionList } from './list/intersection'
import { IntersectionQuestion, Direction } from './question/intersection'
import { ArchivistList } from './list/archivist'
import path from 'path'
import { merge } from 'lodash'
import { inspect } from 'util'
import About from './about'
import { createNode } from 'ipfs'
import program from 'commander'
import { ArchivistClient } from './client/archivist'
import dotenvExpand from 'dotenv-expand'

import { IXyoSigner, getHashingProvider, XyoEcdsaSecp256k1Sha256SignerProvider } from '@xyo-network/sdk-core-nodejs'
import { QuestionList } from './list/question'
import { DivinerWorker } from './worker'
import { OnIntersectQuestion } from './question/onintersect'
import { ScscInfo } from './ScscInfo'

export class DivinerApi {

  public server: ApolloServer
  public ipfs: any
  public archivists: string[] = []

  public resolverArray = [
    {
      Query: {
        async about(parent: any, args: any, context: any, info: any) {
          console.log('resolvers.Query.about')
          return new About(context)
        },
        async block(parent: any, args: any, context: any, info: any) {
          console.log(`resolvers.Query.block: ${args.hash}`)
          return new Block({ hash: args.hash, data: {}, ipfs: context.ipfs })
        },
        async intersections(addresses: [string]) {
          return new IntersectionList(['0x00', '0x11'])
        },
        async archivists(parent: any, args: any, context: any, info: any): Promise<any> {
          return new ArchivistList(context.archivists)
        },
        async questions(parent: any, args: any, context: any, info: any): Promise<any> {
          const questionList = new QuestionList(context)
          await questionList.read()
          return questionList
        },
        async questionHasIntersected(parent: any, args: any, context: any, info: any): Promise<any> {
          let direction: Direction
          switch (args.direction) {
            case 'FORWARD':
              direction = Direction.Forward
              break
            case 'BACKWARD':
              direction = Direction.Backward
              break
            default:
              direction = Direction.Both
              break
          }
          const q = new IntersectionQuestion({
            partyOne: args.partyOneAddresses,
            partyTwo: args.partyTwoAddresses,
            markers: args.markers,
            direction,
            archivists: [new ArchivistClient({ uri: context.archivists[0] })]
          })
          return q.process()
        },
        async questionNotifyIntersect(parent: any, args: any, context: any, info: any): Promise<any> {
          const q = new OnIntersectQuestion({
            partyOne: args.partyOneAddresses,
            partyTwo: args.partyTwoAddresses,
            markers: args.markers,
            direction: Direction.Forward,
            archivists: [new ArchivistClient({ uri: context.archivists[0] })],
            beneficiary: ''
          })
          const res = q.process()
          return res
        }
      }
    },
    scscInfoResolvers(),
    listResolvers(),
    blockResolvers()
  ]

  public resolvers: IResolvers
  public seeds: { archivists: string[], diviners: string[] }
  public scsc: ScscInfo
  public options: any
  public address: string
  public signer: IXyoSigner
  // public worker = new DivinerWorker()

  constructor(options:
    {
      seeds: {
        archivists: string[], diviners: string[]
      },
      scsc: {
        ipfs: string,
        name: string,
        network: string,
        address: string
      }
    }) {
    this.seeds = options.seeds
    this.options = options
    this.scsc = new ScscInfo(options.scsc)
    this.resolvers = merge(this.resolverArray)
    const typeDefs = gql(this.buildSchema())

    this.signer = this.getSigner()
    this.address = this.signer.publicKey.serialize(true).toString('HEX')

    this.seeds.archivists.forEach((archivist) => {
      this.archivists.push(archivist)
    })

    const context = ({ req }: { req: any }) => ({
      ipfs: this.ipfs,
      req,
      address: this.address,
      ethAddress: 'unknown',
      archivists: this.archivists,
      seeds: this.seeds,
      signer: this.signer,
      version: getVersion(),
      scsc: this.scsc
    })

    // this.worker.start(20000, context)

    const config: Config & { cors?: CorsOptions | boolean } = {
      typeDefs,
      resolvers: this.resolvers,
      context
    }

    this.server = new ApolloServer(config)
  }

  public getSigner(): IXyoSigner {
    const signerProvider = new XyoEcdsaSecp256k1Sha256SignerProvider(
      getHashingProvider('sha256')
    )

    return signerProvider.newInstance()
  }

  public async start(port: number = 12002) {
    console.log(' --- START ---')

    await this.scsc.loadContractsFromIpfs()

    this.ipfs = createNode({ port: 1111 })

    this.ipfs.on('ready', () => {
      console.log('Ipfs is ready to use!')
    })

    this.ipfs.on('error', (error: any) => {
      console.log('Something went terribly wrong!', error)
    })

    this.ipfs.on('start', () => console.log('Ipfs started!'))

    this.server.listen({ port }).then(({ url }: { url: any }) => {
      console.log(`XYO Diviner [${getVersion()}] ready at ${url}`)
    })
  }

  private buildSchema() {
    const schemaLocation = path.normalize(`${__dirname}/../graphql/root.graphql`)
    const typeDefs = importSchema(schemaLocation)
    return typeDefs
  }
}

const getVersion = (): string => {
  dotenvExpand({
    parsed: {
      APP_VERSION: '$npm_package_version',
      APP_NAME: '$npm_package_name'
    }
  })

  return process.env.APP_VERSION || 'Unknown'
}

program
  .version(getVersion())
  .option('-p, --port [n]', 'The Tcp port to listen on for connections (not yet implemented)', parseInt)
  .option('-g, --graphql [n]', 'The http port to listen on for graphql connections (default=12002)', parseInt)
  .option(
    '-a, --archivist [s]',
    'The url of the seed archivist to contact (default=http://spatial-archivist.xyo.network:11001)')

program
  .command('start')
  .description('Start the Diviner')
  .action(() => {
    const xyo = new DivinerApi({
      seeds: {
        archivists: [(program.archivist || 'http://spatial-archivist.xyo.network:11001')], diviners: []
      },
      scsc: {
        ipfs: 'QmT7whH3riWmXcTBH67zrG7GrPJDNaZweaFJ7aY8syEGcQ',
        name: 'XyoStakedConsensus',
        network: 'kovan',
        address: ''
      }
    })
    xyo.start(program.graphql || 12002)
  })

program.parse(process.argv)

if (process.argv.length < 3) {
  program.help()
}
