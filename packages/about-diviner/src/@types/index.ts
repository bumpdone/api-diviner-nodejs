/*
 * @Author: XY | The Findables Company <ryanxyo>
 * @Date:   Wednesday, 19th December 2018 1:17:53 pm
 * @Email:  developer@xyfindables.com
 * @Filename: index.ts
 * @Last modified by: ryanxyo
 * @Last modified time: Thursday, 20th December 2018 11:29:51 am
 * @License: All Rights Reserved
 * @Copyright: Copyright XY | The Findables Company
 */

import { IXyoSCSCDescription } from '@xyo-network/scsc'

export interface IXyoAboutDiviner {
  name: string
  version: string,
  url: string,
  address: string,
  seeds: IXyoSeeds,
  scsc: IXyoSCSCDescription
}

export interface IXyoSeeds {
  archivists: string[]
  diviners: string[]
}
