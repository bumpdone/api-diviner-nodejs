export class XYError {
  public code: number
  public message?: string
  public exception?: any

  constructor(code: number, message?: string, exception?: any) {
    this.code = code
    this.message = message
    this.exception = exception
    this.report()
  }

  private report() {
    console.error(`ERROR[${this.code}]: ${this.message || "No Message"}`)
    if (this.exception) {
      console.error(`Exception Data: ${this.exception}`)
    }
  }

}
