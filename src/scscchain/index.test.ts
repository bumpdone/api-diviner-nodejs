import { ScscChain } from './'
import { IPFS, createNode } from 'ipfs'
import { Block } from './block'

import { expect } from 'chai'

describe('ScscChain class', () => {

  const startIpfs = (): Promise<IPFS> => {
    const newIpfs = createNode()
    return new Promise((resolve, reject) => {
      newIpfs.on('ready', async () => {
        console.log("IPFS Ready")
        resolve(newIpfs)
      })
      newIpfs.on('error', async (error) => {
        console.log("IPFS Error")
        reject(error)
      })
    })
  }

  const stopIpfs = (oldIpfs: IPFS): Promise<IPFS> => {
    oldIpfs.stop()
    return new Promise((resolve, reject) => {
      oldIpfs.on('stop', async () => {
        console.log("IPFS Stopped")
        resolve(oldIpfs)
      })
      oldIpfs.on('error', async (error) => {
        console.log("IPFS Error")
        reject(error)
      })
    })
  }

  let scsc: ScscChain
  let ipfs: IPFS
  it('should return create ScscChain', async () => {
    ipfs = await startIpfs()
    console.log('3')
    scsc = new ScscChain({
      contract: "",
      network: "",
      previousHash: "",
      address: "",
      ipfs
    })
    expect(scsc).to.be.an('object')
  }).timeout(10000)

  it('should add item', async () => {
    expect(await scsc.addItem(Buffer.from("Hello"))).to.equal(true)
  })

  let hash: string

  it('should mine block', async () => {
    hash = await scsc.mine()
    console.log(`Hash: ${hash}`)
    expect(hash).to.be.a('string')
  })

  let block: Block

  it('should get block', async () => {
    block = await scsc.getBlock(hash)
    if (block) {
      expect(block.header).to.be.a('object')
    }
  })

  it('should stop ipfs', async () => {
    const oldIpfs = await stopIpfs(ipfs)
    expect(oldIpfs).to.be.a('object')
  })

})
