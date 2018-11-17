"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const IPFSReader_1 = require("../util/IPFSReader");
class ScscInfo {
    constructor(options) {
        this.name = 'XyoStakedConsensus';
        this.address = '';
        this.platform = 'ethereum';
        this.network = 'kovan';
        this.ipfs = 'QmT7whH3riWmXcTBH67zrG7GrPJDNaZweaFJ7aY8syEGcQ';
        this.contracts = [];
        Object.assign(this, options);
    }
    loadContractsFromIpfs() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Loading Contracts from IPFS');
            this.contracts = yield IPFSReader_1.downloadFilesFromIpfs(this.ipfs);
            console.log(`Contracts Loaded: ${this.contracts.length}`);
            return this.contracts.length;
        });
    }
    getABI(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const nameToGet = name || this.name;
            let result = {};
            this.contracts.forEach((contract) => {
                const json = contract.data;
                if (json) {
                    if (json.contractName === nameToGet) {
                        result = json.abi;
                    }
                }
            });
            return result;
        });
    }
    getBytecode(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const nameToGet = name || this.name;
            let result = {};
            this.contracts.forEach((contract) => {
                const json = contract.data;
                if (json) {
                    if (json.contractName === nameToGet) {
                        result = json.bytecode;
                    }
                }
            });
            return result;
        });
    }
}
exports.ScscInfo = ScscInfo;
//# sourceMappingURL=index.js.map