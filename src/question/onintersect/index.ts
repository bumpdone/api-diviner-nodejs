import { IPFS } from 'ipfs'
import { ArchivistClient } from '../../client/archivist'
import { IntersectionQuestion, Direction } from '../intersection'

export class OnIntersectQuestion extends IntersectionQuestion {

  public beneficiary: string

  constructor(params: { partyOne: string[], partyTwo: string[], markers?: string[], direction?: Direction, archivist: ArchivistClient[], beneficiary: string }) {
    super(params)
    this.beneficiary = params.beneficiary
  }

  // process the question
  public async process(): Promise < any > {
    return this.didIntersect() ?
      true : (this.didTimeout() ? false : null)
  }

  private didTimeout(): boolean {
    return false
  }
}
