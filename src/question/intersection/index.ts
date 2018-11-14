import { IPFS } from 'ipfs'
import { ArchivistClient } from '../../client/archivist'
import { Question } from '..'

export enum Direction {
  Forward,
  Backward,
  Both
}

export class IntersectionQuestion extends Question {

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

  // removal is inclusive
  public static removePreceedingDataByHash(hashes: string[], marker: string) {
    let result = hashes
    hashes.every((item: string, index: number) => {
      if (item === marker) {
        result = (index + 1 === hashes.length) ?
          result = [] :result = hashes.slice(index + 1)
        return false // end every
      }
      return true
    })
    return result
  }

  // removal is inclusive
  public static removeSubsequentDataByHash(hashes: string[], marker: string) {
    let result = hashes
    hashes.every((item: string, index: number) => {
      if (item === marker) {
        result = (index === 0) ?
          result = [] :result = hashes.slice(0, index)
        return false // end every
      }
      return true
    })
    return result
  }

  public static removeData(hashes: string[], markers: string[], proc: any) {
    let prunedHashes = hashes
    markers.forEach((marker: string) => {
      prunedHashes = proc(prunedHashes, marker)
    })
    return prunedHashes
  }

  /*public static removePreceedingData(hashes: string[], markers: string[]) {
    let prunedHashes = hashes
    markers.forEach((marker: string) => {
      prunedHashes = this.removePreceedingDataByHash(prunedHashes, marker)
    })
    return prunedHashes
  }

  public static removeSubsequentData(hashes: string[], markers: string[]) {
    let prunedHashes = hashes
    markers.forEach((marker: string) => {
      prunedHashes = this.removeSubsequentDataByHash(prunedHashes, marker)
    })
    return prunedHashes
  }*/

  public p1: string[]
  public p2: string[]
  public markers: string[] // the hashs that is used for the forwad/backward filter
  public direction: Direction
  public archivist: ArchivistClient

  constructor(params:
    { partyOne: string[], partyTwo: string[], markers?: string[], direction?: Direction, archivists: ArchivistClient[] }
  ) {
    super()
    this.type = 'intersection'
    this.p1 = params.partyOne
    this.p2 = params.partyTwo
    this.markers = params.markers || []
    this.direction = params.direction || Direction.Forward
    this.archivist = params.archivists[0]
  }

  // publish the question to scsc
  public async publish(): Promise < string > {
    return '0x000'
  }

  public async didIntersect(): Promise<boolean> {
    let p1Hashes: string[] = []
    let p2Hashes: string[] = []

    try {
      p1Hashes = await this.archivist.blockHashes(this.p1)
      p2Hashes = await this.archivist.blockHashes(this.p2)
    } catch (error) {
      throw new Error(`Failed to Retreive Hashes: ${error}`)
    }

    let proc: any

    switch (this.direction) {
      case Direction.Forward:
        proc = IntersectionQuestion.removePreceedingDataByHash
        break
      case Direction.Backward:
        proc = IntersectionQuestion.removeSubsequentDataByHash
        break
    }

    p1Hashes = IntersectionQuestion.removeData(
      p1Hashes, this.markers, proc
    )

    p2Hashes = IntersectionQuestion.removeData(
      p2Hashes, this.markers, proc
    )

    const intersection = IntersectionQuestion.getStringArrayIntersection(p1Hashes, p2Hashes)

    if (intersection.length > 0) {
      return true
    }
    return false
  }

  // process the question
  public async process(): Promise < any > {
    return this.didIntersect()
  }
}
