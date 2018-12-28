/*
 * @Author: XY | The Findables Company <ryanxyo>
 * @Date:   Friday, 21st December 2018 11:33:04 am
 * @Email:  developer@xyfindables.com
 * @Filename: xyo-question-service.ts
 * @Last modified by: ryanxyo
 * @Last modified time: Friday, 21st December 2018 12:29:08 pm
 * @License: All Rights Reserved
 * @Copyright: Copyright XY | The Findables Company
 */

import { IXyoDivinerArchivistClient } from '@xyo-network/diviner-archivist-client'
import { IXyoHasIntersectedQuestion, IXyoQuestionService } from './@types'
import { XyoErrors, XyoError } from '@xyo-network/errors'
import { XyoBase } from '@xyo-network/base'

export class XyoQuestionService extends XyoBase implements IXyoQuestionService {

  constructor (private readonly archivistClient: IXyoDivinerArchivistClient) {
    super()
  }

  public async havePartiesIntersected(question: IXyoHasIntersectedQuestion): Promise<boolean> {
    return this.didPartiesIntersected(question)
  }

  private async didPartiesIntersected(question: IXyoHasIntersectedQuestion, cursor?: string): Promise<boolean> {
    if (
      !question.partyOne || question.partyOne.length !== 1 ||
      !question.partyTwo || question.partyTwo.length !== 1
    ) {
      throw new XyoError('Party length supports only 1 at this time', XyoErrors.CRITICAL)
    }

    if (question.markers && question.markers.length > 1) {
      throw new XyoError('Marker length support is at most 1 at this time', XyoErrors.CRITICAL)
    }

    const intersections = await this.archivistClient.getIntersections(
      question.partyOne[0],
      question.partyTwo[0],
      100,
      cursor
    )

    if (!intersections) {
      throw new XyoError('Could not retrieve intersection results', XyoErrors.CRITICAL)
    }

    if (intersections.items.length === 0) {
      return false
    }

    if (!question.markers || question.markers.length === 0) {
      return true
    }

    const marker = question.markers[0]
    const indexOfMarker = intersections.items.indexOf(marker)

    if (indexOfMarker !== -1) {
      if (question.direction === 'BACKWARD' || question.direction === 'FORWARD') {
        if (indexOfMarker === 0 && question.direction === 'BACKWARD') {
          return false
        }

        if (
          indexOfMarker === intersections.items.length - 1 &&
          !intersections.meta.hasNextPage &&
          question.direction === 'FORWARD'
        ) {
          return false
        }

        return true
      }

      return true
    }

    if (!intersections.meta.hasNextPage || !intersections.meta.endCursor) {
      return false
    }

    return this.didPartiesIntersected(question, intersections.meta.endCursor)
  }
}
