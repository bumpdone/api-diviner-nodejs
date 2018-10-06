import { IPFS } from 'ipfs'

export interface Options {

  /* the contract address of the SCSC contract that defines the chain */
  contract: string

  /* the network where the SCSC contract resides */
  network: string

  /* The hash of the previous block */
  previousHash: string

  /* the address that mined the bock */
  address: string

  /* the IPFS instance to use to store the blocks */
  ipfs: IPFS

}
