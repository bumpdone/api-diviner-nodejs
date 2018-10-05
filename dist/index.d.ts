import { ApolloServer } from 'apollo-server';
import { IResolvers } from 'graphql-tools';
export declare class DivinerApi {
    server: ApolloServer;
    ipfs: any;
    archivists: string[];
    resolvers: IResolvers;
    constructor(seedArchivist: string);
    start(host?: string, port?: number): void;
    private buildSchema;
}
