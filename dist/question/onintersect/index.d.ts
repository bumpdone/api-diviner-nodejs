import { ArchivistClient } from '../../client/archivist';
import { IntersectionQuestion, Direction } from '../intersection';
export declare class OnIntersectQuestion extends IntersectionQuestion {
    beneficiary: string;
    constructor(params: {
        partyOne: string[];
        partyTwo: string[];
        markers?: string[];
        direction?: Direction;
        archivists: ArchivistClient[];
        beneficiary: string;
    });
    process(): Promise<any>;
    private didTimeout;
}
