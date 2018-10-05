import { ApolloServer } from 'apollo-server';
import { IResolvers } from 'graphql-tools';
export declare class XyoApi {
    server: ApolloServer;
    ipfs: any;
    resolvers: IResolvers;
    constructor();
    start(host?: string, port?: number): void;
    private buildSchema;
}
