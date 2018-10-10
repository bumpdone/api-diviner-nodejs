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
const apollo_client_1 = require("apollo-client");
const apollo_link_http_1 = require("apollo-link-http");
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
class ArchivistClient {
    constructor({ uri: string }) {
        this.uri = "";
        Object.assign(this, { uri: string });
        const httpLink = apollo_link_http_1.createHttpLink({
            uri: this.uri,
            fetch: isomorphic_fetch_1.default,
            fetchOptions: {
                timeout: 10000
            }
        });
        this.client = new apollo_client_1.ApolloClient({
            link: httpLink,
            cache: new apollo_cache_inmemory_1.InMemoryCache()
        });
    }
    blocks(keys) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.client.query({
                query: graphql_tag_1.default `
        query BlocksByPublicKey($publicKeys: [String!]) {
          blocksByPublicKey(publicKeys: $publicKeys) {
            publicKey
            blocks {
              hash
              bytes
              major
              minor
              publicKeys {
                hash
                bytes
                major
                minor
                array {
                  hash
                  bytes
                  major
                  minor
                }
              }
              signatures {
                hash
                bytes
                major
                minor
                array {
                  hash
                  bytes
                  major
                  minor
                }
              }
              payloads {
                hash
                bytes
                major
                minor
                signedPayload {
                  hash
                  bytes
                  major
                  minor
                }
                unsignedPayload {
                  hash
                  bytes
                  major
                  minor
                }
              }
              signedBytes
            }
          }
        }
      `,
                variables: {
                    publicKeys: keys
                }
            });
            // return the array of chains that we found
            return result.data.blocksByPublicKey;
        });
    }
    keys(keys) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.client.query({
                query: graphql_tag_1.default `
        query BlocksByPublicKey($publicKeys: [String!]) {
          blocksByPublicKey(publicKeys: $publicKeys) {
            publicKey
            blocks {
              publicKeys {
                array {
                  bytes
                }
              }
            }
          }
        }
      `,
                variables: {
                    publicKeys: keys
                }
            });
            return result.data;
        });
    }
    blockHashes(keys) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.client.query({
                query: graphql_tag_1.default `
        query BlocksByPublicKey($publicKeys: [String!]) {
          blocksByPublicKey(publicKeys: $publicKeys) {
            publicKey
            blocks {
              hash
            }
          }
        }
      `,
                variables: {
                    publicKeys: keys
                }
            });
            const hashes = [];
            result.data.blocksByPublicKey.forEach((chain) => {
                chain.blocks.forEach((block) => {
                    hashes.push(block.hash);
                });
            });
            return hashes;
        });
    }
}
exports.ArchivistClient = ArchivistClient;
//# sourceMappingURL=index.js.map