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

  public static async reportTimedout(itemA: string, itemB: string, beneficiary: string) {
    const from = sc.getCurrentUser()
    await QuestionList.contract.methods.refundPayment(itemA, itemB, beneficiary).send({ from })
  }

  public static async reportIntersected(itemA: string, itemB: string, beneficiary: string) {
    const from = sc.getCurrentUser()
    await QuestionList.contract.methods.payForDelivery(itemA, itemB, beneficiary).send({ from })
  }

  private static async createRunner() {
    await sc.reloadWeb3(
        '42',
        'QmXdwrnoWGV7uDEQ2HvrTALPoFkF39578HQzmB1CGeqDfT',
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
    console.log('Reading Questions...')
    if (QuestionList.contract) {
      console.log('Reading Questions [Really]...')
      try {
        const question = await QuestionList.contract.methods.questions(0).call()
        const questionObj = new OnIntersectQuestion(
          { partyOne: question.itemA, partyTwo: question.itemB, markers: [question.marker], direction: Direction.Forward, archivists: [new ArchivistClient({ uri:this.context.archivists[0] })], beneficiary: question.beneficiary }
        )
        this.items.push(questionObj)
        console.log(`read[Good]: ${this.items.length}`)
      } catch (ex) {
        console.log('read[Reverted]:', ex)
      }
    }
    return true
  }
}
