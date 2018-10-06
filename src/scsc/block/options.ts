import Data from './data'
import { IPFS } from 'ipfs'

export default interface Options {

  /* The hash of all the bytes in the block */
  hash?: string

  /* The data contained in this block */
  data?: Data

  /* the IPF instance to read data from */
  ipfs?: IPFS

}
