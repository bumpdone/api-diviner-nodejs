/*
 * @Author: XY | The Findables Company <ryanxyo>
 * @Date:   Wednesday, 19th December 2018 1:11:13 pm
 * @Email:  developer@xyfindables.com
 * @Filename: xyo-about-diviner.ts
 * @Last modified by: ryanxyo
 * @Last modified time: Thursday, 20th December 2018 11:30:21 am
 * @License: All Rights Reserved
 * @Copyright: Copyright XY | The Findables Company
 */

import { IXyoAboutDiviner, IXyoSeeds } from './@types'
import { IXyoSCSCDescription } from '@xyo-network/scsc'

export class XyoAboutDiviner implements IXyoAboutDiviner {

  public readonly name = 'Diviner'

  constructor(
    public readonly version: string,
    public readonly url: string,
    public readonly address: string,
    public readonly seeds: IXyoSeeds,
    public readonly scsc: IXyoSCSCDescription
  ) {}
}
