import IPFS from "ipfs";
export declare class Block {
    hash: string;
    bytes: string;
    ipfs: IPFS.IPFS;
    constructor(hash: string, bytes: string, ipfs: IPFS.IPFS);
    read(): Promise<void>;
}
