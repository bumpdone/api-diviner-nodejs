import { IPFS } from 'ipfs';
export interface Options {
    contract: string;
    network: string;
    previousHash: string;
    address: string;
    ipfs: IPFS;
}
