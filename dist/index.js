"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const list_1 = require("./resolvers/list");
const listmeta_1 = require("./resolvers/listmeta");
const block_1 = require("./resolvers/block");
const graphql_import_1 = require("graphql-import");
const block_2 = require("./block");
const intersectionlist_1 = require("./lists/intersectionlist");
const path_1 = __importDefault(require("path"));
const lodash_1 = require("lodash");
const about_1 = require("./about");
const ipfs_1 = require("ipfs");
class XyoApi {
    constructor() {
        this.ipfs = ipfs_1.createNode();
        this.resolvers = lodash_1.merge([
            {
                Query: {
                    about(parent, args, context, info) {
                        return __awaiter(this, void 0, void 0, function* () {
                            console.log(`resolvers.Query.about`);
                            return new about_1.About("Diviner", "0.1.0");
                        });
                    },
                    block(parent, args, context, info) {
                        return __awaiter(this, void 0, void 0, function* () {
                            console.log(`resolvers.Query.block: ${args.hash}`);
                            if (!args.hash) {
                                return new block_2.Block("0x0000", "0x0000", context.ipfs);
                            }
                            return new block_2.Block(args.hash, "0x0001", context.ipfs);
                        });
                    },
                    intersections(addresses) {
                        return __awaiter(this, void 0, void 0, function* () {
                            return new intersectionlist_1.IntersectionList(["0x00", "0x11"]);
                        });
                    }
                }
            },
            list_1.listResolvers(),
            listmeta_1.listMetaResolvers(),
            block_1.blockResolvers()
        ]);
        const typeDefs = apollo_server_1.gql(this.buildSchema());
        const context = ({ req }) => ({
            ipfs: this.ipfs
        });
        const config = {
            typeDefs,
            resolvers: this.resolvers,
            context
        };
        this.server = new apollo_server_1.ApolloServer(config);
    }
    start() {
        console.log(" --- START ---");
        this.ipfs.on('ready', () => {
            console.log('Ipfs is ready to use!');
        });
        this.ipfs.on('error', (error) => {
            console.log('Something went terribly wrong!', error);
        });
        this.ipfs.on('start', () => console.log('Ipfs started!'));
        this.server.listen(4001).then(({ url }) => {
            console.log(`🚀  Server ready at ${url}`);
        });
    }
    buildSchema() {
        const schemaLocation = path_1.default.join('.', 'graphql', 'root.graphql');
        const typeDefs = graphql_import_1.importSchema(schemaLocation);
        return typeDefs;
    }
}
exports.XyoApi = XyoApi;
//# sourceMappingURL=index.js.map