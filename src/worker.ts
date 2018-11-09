import { QuestionList } from './list/question'

export class DivinerWorker {

  private timer?: any
  private context: any

  public async start(interval = 5000, context: any = {}) {
    console.log('Starting Looper...')
    await QuestionList.initialize()
    if (this.timer) {
      console.log('Worker already started...')
    } else {
      this.timer = setInterval(async () => {
        console.log('Looper1')
        await this.looper()
        console.log('Looper2')
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
    questions.items.forEach(async (question: any) => {
      console.log(`Processing Question: ${question.name}`)
      const intersected = await question.process()
      if (intersected) {
        QuestionList.reportIntersected(question.p1, question.p2, question.beneficiary)
      }
    })
  }
}
