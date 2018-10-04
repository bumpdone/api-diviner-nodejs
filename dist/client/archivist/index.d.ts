import { Options } from './options';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
export declare class ArchivistClient {
    uri: string;
    client: ApolloClient<NormalizedCacheObject>;
    constructor({ uri: string }: Options);
    blocks(keys: string[]): Promise<any>;
    keys(keys: string[]): Promise<any>;
    blockHashes(keys: string[]): Promise<any>;
}
