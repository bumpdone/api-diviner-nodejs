import ScscBlock from './'
import { IPFS, createNode } from 'ipfs'

import { expect } from 'chai'

describe('ScscBlock class', () => {

  const block = new ScscBlock({})

  it('should initially be invalid', async () => {
    const validation = block.validate()
    validation.messages.forEach((message) => { console.log(message) })
    expect(validation.valid).to.equal(false)
    expect(validation.messages.length).to.be.above(0)
  })

})
