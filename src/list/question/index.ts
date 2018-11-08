import List from '..'
import { inspect } from 'util'
import { Question } from '../../question'

import * as sc from '../../util/SmartContractService'
const contractNamed = sc.contractNamed

export class QuestionList extends List {

  public items: Question[] = []

  constructor(context: any) {
    super()
  }

  public async read(): Promise<any> {
    this.runner().then(() => {
      const contract = sc.contractNamed('PayOnDelivery')
      console.log('Smart Contract', contract)
    })

    return true
  }

  private async runner() {
    return sc.reloadWeb3(
      '5777',
      'QmWBZp6NbGB3u8CYaWYA6JMcPx8oYQCizzWw8UZzErb2tv',
    )
  }
}
