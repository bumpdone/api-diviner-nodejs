export default class About {
  public name: string
  public version: string
  public url: string
  public address: string
  public ethAddress: string
  public seeds: { archivists: [], diviners: [] }
  public scsc: { address: string, platform: string, network: string, abi: string, ipfs: string}

  constructor(context: any) {
    this.name = 'Diviner'
    this.version = context.version
    this.url = `http://${context.req.headers.host}`
    this.address = context.address
    this.ethAddress = context.ethAddress
    this.seeds = context.seeds
    this.scsc = context.scsc
  }
}
