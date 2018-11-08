import List from '..'
import { inspect } from 'util'
import { Question } from '../../question'

export class QuestionList extends List {

  public items: Question[] = []

  constructor(context: any) {
    super()
  }

  public async read(): Promise<any> {
    return true
  }
}
