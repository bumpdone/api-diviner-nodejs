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
class ScscChain {
    constructor({ contract, network, previousHash, address, ipfs }) {
        this.contract = "";
        this.network = "";
        this.previousHash = "";
        this.address = "";
        this.genesis = "";
        // this is private since we require validation before adding
        this.items = [];
        Object.assign(this, { contract, network, previousHash, address, ipfs });
    }
    static validateItem(item) {
        return true;
    }
    // we validate here to make sure that all items in the list are always valid
    addItem(bytes) {
        let success = false;
        if (ScscChain.validateItem(bytes)) {
            this.items.push(bytes);
            success = true;
        }
        return success;
    }
    clearPending() {
        this.items = [];
    }
    hashItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const hashes = [];
            if (this.ipfs) {
                for (const i of this.items) {
                    const block = yield this.ipfs.block.put(i);
                    hashes.push(block.cid.toBaseEncodedString());
                }
            }
            return hashes;
        });
    }
    mine() {
        return __awaiter(this, void 0, void 0, function* () {
            const resultHash = "";
            if (this.ipfs) {
                const header = {
                    address: this.address,
                    index: "0",
                    previousHash: this.previousHash
                };
                const payments = [];
                const hashes = yield this.hashItems();
                const blockData = {
                    header,
                    payments,
                    hashes
                };
                const block = yield this.ipfs.block.put(Buffer.from(JSON.stringify(blockData)));
                return block.cid.toBaseEncodedString();
            }
            return resultHash;
        });
    }
    getBlock(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = null;
            if (this.ipfs) {
                const block = yield this.ipfs.block.get(hash);
                result = JSON.parse(block.data);
            }
            return result;
        });
    }
}
exports.ScscChain = ScscChain;
//# sourceMappingURL=index.js.map