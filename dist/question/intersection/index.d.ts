import { IPFS } from 'ipfs';
import { ArchivistClient } from '../../client/archivist';
export declare class IntersectionQuestion {
    static fromHash(hash: string, ipfs: IPFS): Promise<boolean>;
    static getStringArrayIntersection(a1: string[], a2: string[]): string[];
    p1: string[];
    p2: string[];
    archivist: ArchivistClient;
    constructor(partyOne: string[], partyTwo: string[], direction: string, archivist: ArchivistClient[]);
    publish(): Promise<string>;
    process(): Promise<boolean>;
}
