import { IPFS } from 'ipfs';
import { ArchivistClient } from '../../client/archivist';
export declare enum Direction {
    Forward = 0,
    Backward = 1,
    Both = 2
}
export declare class IntersectionQuestion {
    static fromHash(hash: string, ipfs: IPFS): Promise<boolean>;
    static getStringArrayIntersection(a1: string[], a2: string[]): string[];
    p1: string[];
    p2: string[];
    archivist: ArchivistClient;
    direction: Direction;
    constructor(partyOne: string[], partyTwo: string[], direction: Direction, archivist: ArchivistClient[]);
    publish(): Promise<string>;
    process(): Promise<boolean>;
    private removePreceedingData;
    private removeSubsequentData;
}
