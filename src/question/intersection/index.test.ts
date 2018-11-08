import { IntersectionQuestion } from '.'

import { expect } from 'chai'

describe('IntersectionQuestion class (getStringArrayIntersection)', () => {

  it('should return intersection of one', async () => {

    const list1 = ['a1', 'b1', 'c1', 'd1']
    const list2 = ['a1', 'b2', 'c2', 'd2']

    const intersection = IntersectionQuestion.getStringArrayIntersection(list1, list2)
    expect(intersection.length).to.equal(1)
    expect(intersection[0]).to.equal('a1')
  })

  it('should return intersection of one', async () => {

    const list1 = ['a1', 'b1', 'c1', 'd1']
    const list2 = ['a2', 'b2', 'c1', 'd2']

    const intersection = IntersectionQuestion.getStringArrayIntersection(list1, list2)
    expect(intersection.length).to.equal(1)
    expect(intersection[0]).to.equal('c1')
  })

  it('should return intersection of one', async () => {

    const list1 = ['a1', 'b1', 'c1', 'd2']
    const list2 = ['a2', 'b2', 'c2', 'd2']

    const intersection = IntersectionQuestion.getStringArrayIntersection(list1, list2)
    expect(intersection.length).to.equal(1)
    expect(intersection[0]).to.equal('d2')
  })

  it('should return intersection of one', async () => {

    const list1 = ['a1', 'b1', 'c1', 'd1']
    const list2 = ['c2', 'd2', 'a1', 'f2']

    const intersection = IntersectionQuestion.getStringArrayIntersection(list1, list2)
    expect(intersection.length).to.equal(1)
    expect(intersection[0]).to.equal('a1')
  })

  it('should return intersection of two', async () => {

    const list1 = ['a1', 'b1', 'c1', 'd1']
    const list2 = ['c1', 'd1', 'e2', 'f2']

    const intersection = IntersectionQuestion.getStringArrayIntersection(list1, list2)
    expect(intersection.length).to.equal(2)
    expect(intersection[0]).to.equal('c1')
    expect(intersection[1]).to.equal('d1')
  })

  it('should return intersection of none', async () => {

    const list1 = ['a1', 'b1', 'c1', 'd1']
    const list2 = ['a2', 'b2', 'c2', 'd2']

    const intersection = IntersectionQuestion.getStringArrayIntersection(list1, list2)
    expect(intersection.length).to.equal(0)
  })

})

describe('IntersectionQuestion class (removePreceedingDataByHash)', () => {
  it('should remove one', async () => {
    const list = ['a1', 'a2', 'a3', 'a4', 'a5']
    const hash = 'a1'
    const hashes = IntersectionQuestion.removePreceedingDataByHash(list, hash)

    expect(hashes.length).to.equal(list.length - 1)
    expect(hashes[0]).to.equal('a2')
  })

  it('should remove all', async () => {
    const list = ['a1', 'a2', 'a3', 'a4', 'a5']
    const hash = 'a5'
    const hashes = IntersectionQuestion.removePreceedingDataByHash(list, hash)

    expect(hashes.length).to.equal(0)
  })

  it('should remove all but one', async () => {
    const list = ['a1', 'a2', 'a3', 'a4', 'a5']
    const hash = 'a4'
    const hashes = IntersectionQuestion.removePreceedingDataByHash(list, hash)

    expect(hashes.length).to.equal(1)
    expect(hashes[0]).to.equal('a5')
  })

})

describe('IntersectionQuestion class (removeSubsequentDataByHash)', () => {
  it('should remove one', async () => {
    const list = ['a1', 'a2', 'a3', 'a4', 'a5']
    const hash = 'a5'
    const hashes = IntersectionQuestion.removeSubsequentDataByHash(list, hash)

    expect(hashes.length).to.equal(list.length - 1)
    expect(hashes[3]).to.equal('a4')
  })

  it('should remove all', async () => {
    const list = ['a1', 'a2', 'a3', 'a4', 'a5']
    const hash = 'a1'
    const hashes = IntersectionQuestion.removeSubsequentDataByHash(list, hash)

    expect(hashes.length).to.equal(0)
  })

  it('should remove all but one', async () => {
    const list = ['a1', 'a2', 'a3', 'a4', 'a5']
    const hash = 'a2'
    const hashes = IntersectionQuestion.removeSubsequentDataByHash(list, hash)

    expect(hashes.length).to.equal(1)
    expect(hashes[0]).to.equal('a1')
  })

})
