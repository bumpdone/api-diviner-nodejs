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
const resolvers_1 = __importDefault(require("./list/resolvers"));
const resolvers_2 = __importDefault(require("./list/meta/resolvers"));
const resolvers_3 = __importDefault(require("./scsc/block/resolvers"));
const graphql_import_1 = require("graphql-import");
const block_1 = __importDefault(require("./scsc/block"));
const intersection_1 = require("./list/intersection");
const intersection_2 = require("./question/intersection");
const archivist_1 = require("./list/archivist");
const path_1 = __importDefault(require("path"));
const lodash_1 = require("lodash");
const about_1 = __importDefault(require("./about"));
const ipfs_1 = require("ipfs");
const commander_1 = __importDefault(require("commander"));
const archivist_2 = require("./client/archivist");
const pkginfo_1 = __importDefault(require("pkginfo"));
class DivinerApi {
    constructor(seedArchivist) {
        this.archivists = [];
        this.resolverArray = [
            {
                Query: {
                    about(parent, args, context, info) {
                        return __awaiter(this, void 0, void 0, function* () {
                            console.log(`resolvers.Query.about`);
                            return new about_1.default("Diviner", module.exports.version, `http://${context.req.headers.host}`, context.address);
                        });
                    },
                    block(parent, args, context, info) {
                        return __awaiter(this, void 0, void 0, function* () {
                            console.log(`resolvers.Query.block: ${args.hash}`);
                            return new block_1.default({ hash: args.hash, data: {}, ipfs: context.ipfs });
                        });
                    },
                    intersections(addresses) {
                        return __awaiter(this, void 0, void 0, function* () {
                            return new intersection_1.IntersectionList(["0x00", "0x11"]);
                        });
                    },
                    archivists(parent, args, context, info) {
                        return __awaiter(this, void 0, void 0, function* () {
                            return new archivist_1.ArchivistList(context.archivists);
                        });
                    }
                },
                Mutation: {
                    questionHasIntersected(parent, args, context, info) {
                        return __awaiter(this, void 0, void 0, function* () {
                            const q = new intersection_2.IntersectionQuestion(args.partyOneAddresses, args.partyTwoAddresses, args.markers, args.direction, [new archivist_2.ArchivistClient({ uri: context.archivists[0] })]);
                            return q.process();
                        });
                    }
                }
            },
            resolvers_1.default(),
            resolvers_2.default(),
            resolvers_3.default()
        ];
        this.resolvers = lodash_1.merge(this.resolverArray);
        const typeDefs = apollo_server_1.gql(this.buildSchema());
        this.archivists.push(seedArchivist);
        const context = ({ req }) => ({
            ipfs: this.ipfs,
            req,
            address: "0x000",
            archivists: this.archivists
        });
        const config = {
            typeDefs,
            resolvers: this.resolvers,
            context
        };
        this.server = new apollo_server_1.ApolloServer(config);
    }
    start(port = 12002) {
        console.log(" --- START ---");
        this.ipfs = ipfs_1.createNode({ port: 1111 });
        this.ipfs.on('ready', () => {
            console.log('Ipfs is ready to use!');
        });
        this.ipfs.on('error', (error) => {
            console.log('Something went terribly wrong!', error);
        });
        this.ipfs.on('start', () => console.log('Ipfs started!'));
        this.server.listen({ port }).then(({ url }) => {
            console.log(`XYO Diviner [${module.exports.version}] ready at ${url}`);
        });
    }
    buildSchema() {
        const schemaLocation = path_1.default.normalize(`${__dirname}/../graphql/root.graphql`);
        const typeDefs = graphql_import_1.importSchema(schemaLocation);
        return typeDefs;
    }
}
exports.DivinerApi = DivinerApi;
pkginfo_1.default(module);
commander_1.default
    .version(module.exports.version)
    .option('-p, --port [n]', 'The Tcp port to listen on for connections (not yet implemented)', parseInt)
    .option('-g, --graphql [n]', 'The http port to listen on for graphql connections', parseInt)
    .option('-a, --archivist [s]', 'The url of the seed archivist to contact (default=http://peers.xyo.network:11001)');
commander_1.default
    .command('start')
    .description('Start the Diviner')
    .action(() => {
    const xyo = new DivinerApi(commander_1.default.archivist || "http://peers.xyo.network:11001");
    xyo.start(commander_1.default.graphql || 12002);
});
commander_1.default.parse(process.argv);
if (process.argv.length < 3) {
    commander_1.default.help();
}
//# sourceMappingURL=index.js.map