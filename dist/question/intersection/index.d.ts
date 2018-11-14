import { IPFS } from 'ipfs';
import { ArchivistClient } from '../../client/archivist';
import { Question } from '..';
export declare enum Direction {
    Forward = 0,
    Backward = 1,
    Both = 2
}
export declare class IntersectionQuestion extends Question {
    static fromHash(hash: string, ipfs: IPFS): Promise<boolean>;
    static getStringArrayIntersection(a1: string[], a2: string[]): string[];
    static removePreceedingDataByHash(hashes: string[], marker: string): string[];
    static removeSubsequentDataByHash(hashes: string[], marker: string): string[];
    static removeData(hashes: string[], markers: string[], proc: any): string[];
    p1: string[];
    p2: string[];
    markers: string[];
    direction: Direction;
    archivist: ArchivistClient;
    constructor(params: {
        partyOne: string[];
        partyTwo: string[];
        markers?: string[];
        direction?: Direction;
        archivists: ArchivistClient[];
    });
    publish(): Promise<string>;
    didIntersect(): Promise<boolean>;
    process(): Promise<any>;
}
