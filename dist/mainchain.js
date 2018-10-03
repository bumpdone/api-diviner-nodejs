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
class MainChain {
    constructor(contract, network, previousHash, ipfs) {
        // this is private since we require validation before adding
        this.items = [];
        this.contract = contract;
        this.network = network;
        this.previousHash = previousHash;
        this.ipfs = ipfs;
    }
    static validateItem(item) {
        return true;
    }
    // we validate here to make sure that all items in the list are always valid
    addItem(bytes) {
        if (MainChain.validateItem(bytes)) {
            this.items.push(bytes);
        }
    }
    clearPending() {
        this.items = [];
    }
    hashItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = false;
            const hashes = [];
            for (const i of this.items) {
                const hash = yield this.ipfs.block.put(i);
                hashes.push(hash);
            }
            return hashes;
        });
    }
}
//# sourceMappingURL=mainchain.js.map