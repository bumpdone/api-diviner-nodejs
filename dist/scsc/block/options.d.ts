import Data from './data';
import { IPFS } from 'ipfs';
export default interface Options {
    hash?: string;
    data?: Data;
    ipfs?: IPFS;
}
