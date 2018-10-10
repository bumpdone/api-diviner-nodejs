import { IPFS } from 'ipfs';
export default interface Options {
    contract: string;
    network: string;
    previousHash: string;
    address: string;
    ipfs: IPFS;
}
