import { Intersection } from '../../intersection';
import List from '..';
export declare class IntersectionList extends List {
    addresses: string[];
    items: Intersection[];
    constructor(addresses: string[]);
    read(): Promise<this>;
}
