import List from '..'
import { inspect } from 'util'
import { Question } from '../../question'

import * as sc from '../../util/SmartContractService'
const contractNamed = sc.contractNamed

export class QuestionList extends List {
  public static contract: any
  public static runner = QuestionList.createRunner()

  private static async createRunner() {
    const runner = sc.reloadWeb3(
        '42',
        'QmWBZp6NbGB3u8CYaWYA6JMcPx8oYQCizzWw8UZzErb2tv',
      )
    runner.then(() => {
      QuestionList.contract = sc.contractNamed('PayOnDelivery')
      console.log('Smart Contract', this.contract)
    })
  }

  public items: Question[] = []

  constructor(context: any) {
    super()
  }

  public async read(): Promise < any > {
    console.log('Reading  sQuestions...')
    try {
      if (QuestionList.contract) {
        const questions = await QuestionList.contract.methods
            .allQuestions()
            .send()
        console.log(`Quesionts: ${questions.length}`)
      }
    } catch (ex) {
      console.error(ex)
    }
    return true
  }
}
