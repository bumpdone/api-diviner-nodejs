/*
 * @Author: XY | The Findables Company <ryanxyo>
 * @Date:   Friday, 21st December 2018 11:46:46 am
 * @Email:  developer@xyfindables.com
 * @Filename: questions-worker.ts
 * @Last modified by: ryanxyo
 * @Last modified time: Friday, 21st December 2018 12:30:32 pm
 * @License: All Rights Reserved
 * @Copyright: Copyright XY | The Findables Company
 */

import { XyoBase } from '@xyo-network/base'
import { IQuestionsProvider, IQuestion, IQuestionType, IXyoHasIntersectedQuestion, IXyoQuestionService } from './@types'
import { XyoError, XyoErrors } from '@xyo-network/errors'

export class QuestionsWorker extends XyoBase {

  private static QUESTIONS_BREAK = 0

  private nextQuestionsPromise: Promise<IQuestion<any, any>> | undefined
  private stopLoopingPromise: Promise<void> | undefined
  private resolveStopLoopingPromise: ((value?: void | PromiseLike<void> | undefined) => void | undefined) | undefined

  constructor (private readonly questionsProvider: IQuestionsProvider, private readonly questionsService: IXyoQuestionService) {
    super()
  }

  public start() {
    if (this.nextQuestionsPromise) {
      throw new XyoError('QuestionsWorker is already working. Can not start', XyoErrors.CRITICAL)
    }

    this.loop()
  }

  public async stop(): Promise<void> {
    if (!this.nextQuestionsPromise) {
      return
    }

    if (this.stopLoopingPromise) {
      return this.stopLoopingPromise
    }

    this.stopLoopingPromise = new Promise((resolve, reject) => {
      this.resolveStopLoopingPromise = resolve
    })
  }

  private loop() {
    this.nextQuestionsPromise = this.questionsProvider.nextQuestion()

    return this.nextQuestionsPromise
      .then((question) => {
        return this.onQuestionProvided(question)
      })
      .then(() => {
        if (this.stopLoopingPromise && this.resolveStopLoopingPromise) {
          this.nextQuestionsPromise = undefined
          this.resolveStopLoopingPromise()
          this.stopLoopingPromise = undefined
          this.resolveStopLoopingPromise = undefined
        }

        setTimeout(() => this.loop(), QuestionsWorker.QUESTIONS_BREAK)
      })
  }

  private async onQuestionProvided<Q, A>(question: IQuestion<Q, A>): Promise<void> {
    if (question.type === IQuestionType.DID_INTERSECT) {
      const coercedQuestion = (question as unknown) as IQuestion<IXyoHasIntersectedQuestion, boolean>
      const haveIntersected = await this.questionsService.havePartiesIntersected(coercedQuestion.getQuestion())
      coercedQuestion.answer(haveIntersected)
      return
    }

    question.cantAnswer()
  }

}
