import { QuestionList } from './list/question'

export class DivinerWorker {

  private timer?: any
  private context: any

  public start(interval = 5000, context: any = {}) {
    if (this.timer) {
      console.log('Worker already started...')
    } else {
      this.timer = setInterval(() => {
        this.looper()
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

  private looper() {
    console.log('Looking for Questions...')
    const questions = new QuestionList(this.context)
    questions.read()
    questions.items.forEach((question) => {
      console.log(`Processing Question: ${question.name}`)
      question.process()
    })
  }
}
