import { QuestionList } from './list/question'

export class DivinerWorker {

  private timer?: any
  private context: any

  public async start(interval = 5000, context: any = {}) {
    console.log('Starting Looper...')
    this.context = context
    await QuestionList.initialize()
    if (this.timer) {
      console.log('Worker already started...')
    } else {
      this.timer = setInterval(async () => {
        console.log('========')
        await this.looper()
        console.log('--------')
      }, interval)
    }
  }

  public stop() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    } else {
      console.log('Worker already stopped...')
    }
  }

  private async looper() {
    console.log('Looking for Questions...')
    const questions = new QuestionList(this.context)
    await questions.read()
    await questions.items.forEach(async (question: any) => {
      console.log('Processing Question...')
      const intersected = await question.process()
      console.log(`Processed Question: ${intersected}`)
      if (intersected) {
        await QuestionList.reportIntersected(question.p1, question.p2, question.beneficiary)
      }
    })
  }
}
