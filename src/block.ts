import IPFS from "ipfs"

export class Block {
  public hash: string
  public bytes: string
  public ipfs: IPFS.IPFS
  constructor(hash: string, bytes: string, ipfs: IPFS.IPFS) {
    this.hash = hash
    this.bytes = bytes
    this.ipfs = ipfs
  }

  public async read() {
    this.ipfs.files.get(this.hash)
  }

}
