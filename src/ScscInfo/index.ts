import { downloadFilesFromIpfs } from '../util/IPFSReader'

export class ScscInfo {
  public name = 'XyoStakedConsensus'
  public address = ''
  public platform = 'ethereum'
  public network = 'kovan'
  public ipfs = 'QmT7whH3riWmXcTBH67zrG7GrPJDNaZweaFJ7aY8syEGcQ'

  constructor(options: {address?: string, platform?: string, network?:string, ipfs?: string}) {
    Object.assign(this, options)
  }

  private contracts: any[] = []

  public async loadContractsFromIpfs(): Promise<number> {
    console.log('Loading Contracts from IPFS')
    this.contracts = await downloadFilesFromIpfs(this.ipfs)
    console.log(`Contracts Loaded: ${this.contracts.length}`)
    return this.contracts.length
  }

  public async getABI(name?: string): Promise<any> {
    const nameToGet = name || this.name
    let result: {} = {}
    this.contracts.forEach((contract: any) => {
      const json = contract.data
      if (json) {
        if (json.contractName === nameToGet) {
          result = json.abi
        }
      }
    })
    return result
  }

  public async getBytecode(name?: string): Promise<any> {
    const nameToGet = name || this.name
    let result: {} = {}
    this.contracts.forEach((contract: any) => {
      const json = contract.data
      if (json) {
        if (json.contractName === nameToGet) {
          result = json.bytecode
        }
      }
    })
    return result
  }
}
