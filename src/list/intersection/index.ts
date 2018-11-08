import { Intersection } from '../../intersection'
import List from '..'
import { inspect } from 'util'

export class IntersectionList extends List {

  public addresses: string[]
  public items: Intersection[]

  constructor(addresses: string[]) {
    super()
    this.addresses = addresses
    this.items = []
  }

  public async read() {
    this.items.push(new Intersection('2018-09-14T12:43:37+0700', 10))
    return this
  }
}
