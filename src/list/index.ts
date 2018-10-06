import Meta from './meta'

export default class List {

  public meta: Meta

  constructor() {
    this.meta = new Meta()
  }

  public async read() {
    return this
  }
}
