import { Options } from './options';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
export declare class ArchivistClient {
    private static blockHashesQuery;
    private static keysQuery;
    private static blocksFields;
    uri: string;
    client: ApolloClient<NormalizedCacheObject>;
    constructor({ uri: string }: Options);
    blocks(keys: string[], fields: string): Promise<any>;
    keys(keys: string[]): Promise<any>;
    blockHashes(keys: string[]): Promise<any>;
}
