import { IPFS } from 'ipfs'
import { ArchivistClient } from '../../client/archivist'

export enum Direction {
  Forward,
  Backward,
  Both
}

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

  // removal is inclusive
  public static removePreceedingDataByHash(hashes: string[], marker: string) {
    let result = hashes
    hashes.every((item: string, index: number) => {
      if (item === marker) {
        if (index + 1 === hashes.length) {
          result = []
        }
        result = hashes.slice(index + 1)
        return false // end every
      }
      return true
    })
    return result
  }

  // removal is inclusive
  public static removeSubsequentDataByHash(hashes: string[], marker: string) {
    let index = 0
    hashes.forEach((hash: string) => {
      if (hash === marker) {
        if (index === 0) {
          return []
        }
        return hashes.slice(0, index - 1)
      }
      index++
    })
    return hashes
  }

  public static removePreceedingData(hashes: string[], markers: string[]) {
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
  }

  public p1: string[]
  public p2: string[]
  public markers: string[] // the hashs that is used for the forwad/backward filter
  public direction: Direction
  public archivist: ArchivistClient

  constructor(partyOne: string[], partyTwo: string[], markers: string[], direction: Direction, archivist: ArchivistClient[]) {
    this.p1 = partyOne
    this.p2 = partyTwo
    this.markers = markers
    this.direction = direction
    this.archivist = archivist[0]
  }

  // publish the question to scsc
  public async publish(): Promise < string > {
    return "0x000"
  }

  // process the question
  public async process(): Promise < boolean > {
    let p1Hashes: string[] = []
    let p2Hashes: string[] = []

    try {
      p1Hashes = await this.archivist.blockHashes(this.p1)
      p2Hashes = await this.archivist.blockHashes(this.p2)
    } catch (error) {
      throw new Error("Failed to Retreive Hashes")
    }

    switch (this.direction) {
      case Direction.Forward:
        p1Hashes = IntersectionQuestion.removePreceedingData(p1Hashes, this.p1)
        p2Hashes = IntersectionQuestion.removePreceedingData(p2Hashes, this.p2)
        break
      case Direction.Backward:
        p1Hashes = IntersectionQuestion.removeSubsequentData(p1Hashes, this.p1)
        p2Hashes = IntersectionQuestion.removeSubsequentData(p2Hashes, this.p2)
        break
    }

    const intersection = IntersectionQuestion.getStringArrayIntersection(p1Hashes, p2Hashes)

    if (intersection.length > 0) {
      return true
    }
    return false
  }
}
