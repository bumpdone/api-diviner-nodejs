import { ApolloServer } from 'apollo-server';
import { IResolvers } from 'graphql-tools';
import IPFS from 'ipfs';
export declare class XyoApi {
    server: ApolloServer;
    ipfs: IPFS.IPFS;
    resolvers: IResolvers;
    constructor();
    start(): void;
    private buildSchema;
}
