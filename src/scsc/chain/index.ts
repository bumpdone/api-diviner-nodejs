import { IPFS } from 'ipfs'
import Options from './options'
import Header from '../block/header'
import Payment from '../block/payment'
import Block from '../block'

export default class ScscChain {

  public static validateItem(item: Buffer): boolean {
    return true
  }

  public contract = ''
  public network = ''
  public previousHash = ''
  public address = ''
  public genesis = ''
  public ipfs?: IPFS

  // this is private since we require validation before adding
  private items: Buffer[] = []

  constructor({ contract, network, previousHash, address, ipfs }: Options) {
    Object.assign(this, { contract, network, previousHash, address, ipfs })
  }

  // we validate here to make sure that all items in the list are always valid
  public addItem(bytes: Buffer): boolean {
    let success = false
    if (ScscChain.validateItem(bytes)) {
      this.items.push(bytes)
      success = true
    }
    return success
  }

  public clearPending() {
    this.items = []
  }

  public async hashItems(): Promise < string[] > {
    const hashes: string[] = []
    if (this.ipfs) {
      for (const i of this.items) {
        const block = await this.ipfs.block.put(i)
        hashes.push(block.cid.toBaseEncodedString())
      }
    }
    return hashes
  }

  public async mine(): Promise < string > {
    const resultHash = ''
    if (this.ipfs) {
      const header: Header = {
        address: this.address,
        index: '0',
        previousHash: this.previousHash
      }
      const payments: Payment[] = []
      const hashes = await this.hashItems()
      const blockData = new Block({
        data: {
          header,
          payments,
          hashes
        }
      })

      const block = await this.ipfs.block.put(Buffer.from(JSON.stringify(blockData)))
      return block.cid.toBaseEncodedString()
    }
    return resultHash
  }

  public async getBlock(hash: string): Promise < Block > {
    let result: any = null
    if (this.ipfs) {
      const block = await this.ipfs.block.get(hash)
      result = JSON.parse(block.data)
    }

    return result
  }
}
