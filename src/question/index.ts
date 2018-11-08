export class Question {
  public type = 'unknown'
  public name = 'unnamed'

  public async process(): Promise<any> {
    return false
  }
}
