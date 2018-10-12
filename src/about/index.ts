export default class About {
  public name: string
  public version: string
  public url: string
  public address: string
  constructor(name: string, version: string, url: string, address: string) {
    this.name = name
    this.version = version
    this.url = url
    this.address = address
  }
}
