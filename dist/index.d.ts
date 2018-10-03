/// <reference path="../src/types/ipfs.d.ts" />
import { ApolloServer } from 'apollo-server';
import { IResolvers } from 'graphql-tools';
export declare class XyoApi {
    server: ApolloServer;
    ipfs: 'ipfs'.IPFS;
    resolvers: IResolvers;
    constructor();
    start(): void;
    private buildSchema;
}
