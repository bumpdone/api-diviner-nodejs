import { Intersection } from '../intersection';
import { ListMeta } from './listmeta';
export declare class IntersectionList {
    meta: ListMeta;
    addresses: string[];
    items: Intersection[];
    constructor(addresses: string[]);
    read(): Promise<this>;
}
