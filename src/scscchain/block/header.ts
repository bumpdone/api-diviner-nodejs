
export interface Header {

  /* the diviner that mined the bock */
  address: string,

  /* the block number.  Has to be sequencial with the last block number */
  index: string,

  /* the hash of the previous block on the chain */
  previousHash: string

}
