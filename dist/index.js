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
const path_1 = __importDefault(require("path"));
const lodash_1 = require("lodash");
const about_1 = __importDefault(require("./about"));
const ipfs_1 = require("ipfs");
const commander_1 = __importDefault(require("commander"));
const archivist_1 = require("./client/archivist");
const pkginfo_1 = require("pkginfo");
class DivinerApi {
    constructor(seedArchivist) {
        this.archivists = [];
        this.resolvers = lodash_1.merge([
            {
                Query: {
                    about(parent, args, context, info) {
                        return __awaiter(this, void 0, void 0, function* () {
                            console.log(`resolvers.Query.about`);
                            return new about_1.default("Diviner", pkginfo_1.version, `http://${context.req.headers.host}`, context.address);
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
                    }
                },
                Mutation: {
                    questionHasIntersected(parent, args, context, info) {
                        return __awaiter(this, void 0, void 0, function* () {
                            const q = new intersection_2.IntersectionQuestion(args.partyOneAddresses, args.partyTwoAddresses, args.direction, [new archivist_1.ArchivistClient({ uri: context.archivists[0] })]);
                            return q.process();
                        });
                    }
                }
            },
            resolvers_1.default(),
            resolvers_2.default(),
            resolvers_3.default()
        ]);
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
    start(host = 'localhost', port = 11001) {
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
            console.log(`XYO Diviner [${pkginfo_1.version}] ready at ${url}`);
        });
    }
    buildSchema() {
        const schemaLocation = path_1.default.normalize(`${__dirname}/../graphql/root.graphql`);
        const typeDefs = graphql_import_1.importSchema(schemaLocation);
        return typeDefs;
    }
}
exports.DivinerApi = DivinerApi;
commander_1.default
    .version(pkginfo_1.version)
    .option('-p, --port [n]', 'The Tcp port to listen on for connections (not yet implemented)', parseInt)
    .option('-g, --graphql [n]', 'The http port to listen on for graphql connections', parseInt)
    .option('-a, --archivist [s]', 'The url of the seed archivist to contact (default=http://localhost:11001)');
commander_1.default
    .command('start')
    .description('Start the Diviner')
    .action(() => {
    const xyo = new DivinerApi(commander_1.default.archivist || "http://localhost:11001");
    xyo.start(commander_1.default.host || "localhost", commander_1.default.graphql || 12002);
});
commander_1.default.parse(process.argv);
if (process.argv.length < 3) {
    commander_1.default.help();
}
//# sourceMappingURL=index.js.map