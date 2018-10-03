import { IPFS } from "ipfs";
export declare class Block {
    hash: string;
    bytes: string;
    ipfs: IPFS;
    constructor(hash: string, bytes: string, ipfs: IPFS);
    read(): Promise<void>;
}
