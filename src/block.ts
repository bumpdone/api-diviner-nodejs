export class Block {
  public hash: string
  public bytes: string
  constructor(hash: string, bytes: string) {
    this.hash = hash
    this.bytes = bytes
  }
}
