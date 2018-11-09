import { IPFS } from 'ipfs'
import { ArchivistClient } from '../../client/archivist'
import { IntersectionQuestion, Direction } from '../intersection'

export class OnIntersectQuestion extends IntersectionQuestion {

  public beneficiary: string

  constructor(params: { partyOne: string[], partyTwo: string[], markers?: string[], direction?: Direction, archivists: ArchivistClient[], beneficiary: string }) {
    super(params)
    this.beneficiary = params.beneficiary
  }

  // process the question
  public async process(): Promise < any > {
    const didInteract = await this.didIntersect()
    const didTimeout = this.didTimeout()
    return didInteract ? true : (didTimeout ? false : null)
  }

  private didTimeout(): boolean {
    return false
  }
}
