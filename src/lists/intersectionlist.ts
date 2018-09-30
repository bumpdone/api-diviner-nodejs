import { Intersection } from '../intersection'
import { ListMeta } from './listmeta'
import { inspect } from 'util'

export class IntersectionList {

  public meta: ListMeta
  public addresses: string[]
  public items: Intersection[]

  constructor(addresses: string[]) {
    this.addresses = addresses
    this.meta = new ListMeta()
    this.items = []
  }

  public async read() {
    this.items.push(new Intersection("2018-09-14T12:43:37+0700", 10))
    return this
  }
}
