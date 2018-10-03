/// <reference types="node" />
import { IPFS } from 'ipfs';
import { Options } from './options';
export declare class ScscChain {
    static validateItem(item: Buffer): boolean;
    contract: string;
    network: string;
    previousHash: string;
    address: string;
    ipfs?: IPFS;
    private items;
    constructor({ contract, network, previousHash, address, ipfs }: Options);
    addItem(bytes: Buffer): boolean;
    clearPending(): void;
    hashItems(): Promise<string[]>;
    mine(): Promise<string>;
    getBlock(hash: string): Promise<any>;
}
