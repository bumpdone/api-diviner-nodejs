import List from '..'
import { inspect } from 'util'
import { Question } from '../../question'

import * as sc from '../../util/SmartContractService'
import { OnIntersectQuestion } from '../../question/onintersect'
import { Direction } from '../../question/intersection'
import { ArchivistClient } from '../../client/archivist'

export class QuestionList extends List {
  public static contract: any
  public static runner: any

  public static async initialize() {
    QuestionList.runner = await QuestionList.createRunner()
  }

  public static sendParams(from: string) {
    return { from, gas: 6986331, gasPrice: 40000000000 }
  }

  public static async reportTimeout(itemA: string, itemB: string, beneficiary: string) {
    const from = sc.getCurrentUser()
    if (from) {
      console.log('Reporting Timed Out: ', from)
      await QuestionList.contract.methods.refundPayment(itemA, itemB, beneficiary)
        .send(QuestionList.sendParams(from))
    }
  }

  public static async reportIntersected(itemA: string, itemB: string, beneficiary: string) {
    const from = sc.getCurrentUser()
    if (from) {
      console.log('Reporting Intersected: ', from)
      await QuestionList.contract.methods.payForDelivery(itemA, itemB, beneficiary)
        .send(QuestionList.sendParams(from))
    }
  }

  private static async createRunner() {
    await sc.reloadWeb3(
        '1',
        'QmS76L77m9Dd3esNxShUoAGW7EWpmZ2M663wdUTVhNFLpg',
      )

    QuestionList.contract = await sc.contractNamed('PayOnDelivery')
    console.log('Smart Contract Loaded!')
  }

  public items: Question[] = []
  private context: any

  constructor(context: any) {
    super()
    this.context = context({ req:{} })
  }

  public async read(): Promise < any > {
    if (QuestionList.contract) {
      console.log('... .. ...')
      try {
        const question = await QuestionList.contract.methods.questions(0).call()
        const questionObj = new OnIntersectQuestion(
          {
            partyOne: question.itemA,
            partyTwo: question.itemB,
            markers: [question.marker],
            direction: Direction.Forward,
            archivists: [new ArchivistClient({ uri:this.context.archivists[0] })],
            beneficiary: question.beneficiary
          }
        )
        this.items.push(questionObj)
        console.log(`read: ${this.items.length} Questions Found`)
      } catch (ex) {
        console.log('read: No Questions Found')
      }
    }
    return true
  }
}
