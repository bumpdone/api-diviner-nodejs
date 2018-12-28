/*
 * @Author: XY | The Findables Company <ryanxyo>
 * @Date:   Friday, 21st December 2018 11:30:24 am
 * @Email:  developer@xyfindables.com
 * @Filename: index.ts
 * @Last modified by: ryanxyo
 * @Last modified time: Friday, 21st December 2018 12:25:22 pm
 * @License: All Rights Reserved
 * @Copyright: Copyright XY | The Findables Company
 */

export interface IXyoAnswerProvider<Q, A> {
  resolve(question: Q): Promise<A>
}

export interface IXyoQuestionService {
  havePartiesIntersected(question: IXyoHasIntersectedQuestion): Promise<boolean>
}

export interface IXyoHasIntersectedQuestion {
  partyOne: string[],
  partyTwo: string[],
  markers: string[],
  direction: 'FORWARD' | 'BACKWARD'
}

export enum IQuestionType {
  DID_INTERSECT
}

export interface IQuestion<Q extends any, A extends any> {
  type: IQuestionType
  getQuestion(): Q
  answer(answer: A): void
  cantAnswer(): void
}

export interface IQuestionsProvider {
  nextQuestion<Q, A>(): Promise<IQuestion<Q, A>>
}
