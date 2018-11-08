import List from '..'
import { inspect } from 'util'
import { Question } from '../../question'

import * as sc from '../../util/SmartContractService'
const contractNamed = sc.contractNamed

export class QuestionList extends List {

  public items: Question[] = []
  public contract: any

  constructor(context: any) {
    super()
    this.runner().then(() => {
      this.contract = sc.contractNamed('PayOnDelivery')
      console.log('Smart Contract', this.contract)
    })
  }

  public async read(): Promise<any> {
    /*if (this.contract) {
      this.contract.
    }*/
    return true
  }

  private async runner() {
    return sc.reloadWeb3(
      '5777',
      'QmWBZp6NbGB3u8CYaWYA6JMcPx8oYQCizzWw8UZzErb2tv',
    )
  }
}
