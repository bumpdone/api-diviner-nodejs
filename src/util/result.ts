import { XYError } from './error'

export class XYResult<T = any> {

  public data: T
  public error?: XYError

  constructor(data: T, error?: XYError) {
    this.data = data
    this.error = error
  }

  public done(data: T) {
    this.data = data
    return this
  }

  public fail(code: number, message?: string, exception?: any) {
    this.error = new XYError(code, message, exception)
    return this
  }
}
