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
    static removePreceedingDataByHash(hashes: string[], marker: string): string[];
    static removeSubsequentDataByHash(hashes: string[], marker: string): string[];
    static removePreceedingData(hashes: string[], markers: string[]): string[];
    static removeSubsequentData(hashes: string[], markers: string[]): string[];
    p1: string[];
    p2: string[];
    markers: string[];
    direction: Direction;
    archivist: ArchivistClient;
    constructor(partyOne: string[], partyTwo: string[], markers: string[], direction: Direction, archivist: ArchivistClient[]);
    publish(): Promise<string>;
    process(): Promise<boolean>;
}
