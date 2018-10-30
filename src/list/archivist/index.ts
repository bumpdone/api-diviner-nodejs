import List from '..'
import { inspect } from 'util'

export class ArchivistList extends List {

  public items: string[]

  constructor(urls: string[]) {
    super()
    this.items = urls
  }
}
