/*
 * @Author: XY | The Findables Company <ryanxyo>
 * @Date:   Wednesday, 2nd January 2019 4:41:37 pm
 * @Email:  developer@xyfindables.com
 * @Filename: index.ts
 * @Last modified by: ryanxyo
 * @Last modified time: Wednesday, 2nd January 2019 4:42:58 pm
 * @License: All Rights Reserved
 * @Copyright: Copyright XY | The Findables Company
 */
import { IXyoSeeds } from '@xyo-network/about-diviner'

export interface IDivinerLauncherConfig {
  graphQLPort: number,
  about: {
    version: string,
    url: string,
    address: string,
    ethAddress: string,
    seeds: IXyoSeeds
  },
  ipfs: {
    host: string,
    port: string,
    protocol: 'http' | 'https'
  },
  stakedConsensus: {
    ipfsHash: string
    network: 'kovan' // consider adding main and other networks if appropriate
    platform: 'ethereum' // once other platforms are available this can be extended
  },
  web3: {
    host: string
  },
  ethereumContracts: {
    PayOnDelivery: {
      address: string // must be provided
    }
  }
}
