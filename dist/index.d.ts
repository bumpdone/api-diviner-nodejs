import { ApolloServer } from 'apollo-server';
import { IResolvers } from 'graphql-tools';
export declare class XyoApi {
    resolvers: IResolvers;
    server: ApolloServer;
    constructor();
    start(): void;
    private buildSchema;
}
