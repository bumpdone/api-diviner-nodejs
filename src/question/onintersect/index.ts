import { IPFS } from 'ipfs'
import { ArchivistClient } from '../../client/archivist'
import { IntersectionQuestion } from '../intersection'

export class OnIntersectQuestion extends IntersectionQuestion {

  // process the question
  public async process(): Promise < any > {
    return this.didIntersect() ?
      true : (this.didTimeout() ? false : null)
  }

  private didTimeout(): boolean {
    return false
  }
}
