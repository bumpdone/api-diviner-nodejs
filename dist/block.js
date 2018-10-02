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
class Block {
    constructor(hash, bytes, ipfs) {
        this.hash = hash;
        this.bytes = bytes;
        this.ipfs = ipfs;
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            this.ipfs.files.get(this.hash);
        });
    }
}
exports.Block = Block;
//# sourceMappingURL=block.js.map