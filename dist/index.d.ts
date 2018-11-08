import { ApolloServer } from 'apollo-server';
import { IResolvers } from 'graphql-tools';
import Block from './scsc/block';
import { IntersectionList } from './list/intersection';
import About from './about';
import { IXyoSigner } from '@xyo-network/sdk-core-nodejs';
import { DivinerWorker } from './worker';
export declare class DivinerApi {
    server: ApolloServer;
    ipfs: any;
    archivists: string[];
    resolverArray: (IResolvers<any, any> | {
        Query: {
            about(parent: any, args: any, context: any, info: any): Promise<About>;
            block(parent: any, args: any, context: any, info: any): Promise<Block>;
            intersections(addresses: [string]): Promise<IntersectionList>;
            archivists(parent: any, args: any, context: any, info: any): Promise<any>;
            questions(parent: any, args: any, context: any, info: any): Promise<any>;
            questionHasIntersected(parent: any, args: any, context: any, info: any): Promise<any>;
        };
    })[];
    resolvers: IResolvers;
    seeds: {
        archivists: string[];
        diviners: string[];
    };
    address: string;
    signer: IXyoSigner;
    worker: DivinerWorker;
    constructor(options: {
        seeds: {
            archivists: string[];
            diviners: string[];
        };
    });
    getSigner(): IXyoSigner;
    start(port?: number): void;
    private buildSchema;
}
