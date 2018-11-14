export default class About {
  public name: string
  public version: string
  public url: string
  public address: string
  public seeds: { archivists: [], diviners: [] }

  constructor(options: {
    name: string,
    version: string,
    url: string,
    address: string,
    seeds: {
      archivists: [], diviners: []
    }
  }) {
    this.name = options.name
    this.version = options.version
    this.url = options.url
    this.address = options.address
    this.seeds = options.seeds
  }
}
