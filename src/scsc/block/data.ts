import Header from './header'
import Payment from './payment'

export default interface Data {
  /* The meta information about this block */
  header?: Header

  /* The list of payments resulting from the XYO transactions */
  payments?: Payment[]

  /* The hashes of all the included transactions */
  hashes?: string[]
}
