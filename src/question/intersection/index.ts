import { IPFS } from 'ipfs'
import { ArchivistClient } from '../../client/archivist'

export class IntersectionQuestion {

  // given an ipfs hash, load the question
  public static async fromHash(hash: string, ipfs: IPFS): Promise<boolean> {
    const json = await ipfs.files.get(hash)
    const obj = JSON.parse(json)
    Object.assign(this, json)
    return true
  }

  public static getStringArrayIntersection(a1: string[], a2: string[]) {
    const bucket: { [index: string]: number} = {}
    a1.forEach((item: string) => {
      bucket[item] = 1
    })
    const intersection: string[] = []
    a2.forEach((item: string) => {
      if (bucket[item] === 1) {
        intersection.push(item)
      }
    })
    return intersection
  }

  public p1: string[]
  public p2: string[]
  public archivist: ArchivistClient

  constructor(partyOne: string[], partyTwo: string[], direction: string, archivist: ArchivistClient[]) {
    this.p1 = partyOne
    this.p2 = partyTwo
    this.archivist = archivist[0]
  }

  // publish the question to scsc
  public async publish(): Promise<string> {
    return "0x000"
  }

  // process the question
  public async process(): Promise<boolean> {
    let p1Hashes: string[] = []
    let p2Hashes: string[] = []

    try {
      p1Hashes = await this.archivist.blockHashes(this.p1)
      p2Hashes = await this.archivist.blockHashes(this.p2)
    } catch (error) {
      throw new Error("Failed to Retreive Hashes")
    }
    const intersection = IntersectionQuestion.getStringArrayIntersection(p1Hashes, p2Hashes)

    if (intersection.length > 0) {
      return true
    }
    return false
  }
}
