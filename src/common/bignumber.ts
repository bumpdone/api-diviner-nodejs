export class BigNumber {

  public static from(value: string, decimals: number) {
    return new BigNumber(value, decimals)
  }
  public value: string
  public decimals: number
  constructor(value: string, decimals: number) {
    this.value = value
    this.decimals = decimals
  }
}
