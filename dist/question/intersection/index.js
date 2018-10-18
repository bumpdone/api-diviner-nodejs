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
class IntersectionQuestion {
    // given an ipfs hash, load the question
    static fromHash(hash, ipfs) {
        return __awaiter(this, void 0, void 0, function* () {
            const json = yield ipfs.files.get(hash);
            const obj = JSON.parse(json);
            Object.assign(this, json);
            return true;
        });
    }
    static getStringArrayIntersection(a1, a2) {
        const bucket = {};
        a1.forEach((item) => {
            bucket[item] = 1;
        });
        const intersection = [];
        a2.forEach((item) => {
            if (bucket[item] === 1) {
                intersection.push(item);
            }
        });
        return intersection;
    }
    constructor(partyOne, partyTwo, direction, archivist) {
        this.p1 = partyOne;
        this.p2 = partyTwo;
        this.archivist = archivist[0];
    }
    // publish the question to scsc
    publish() {
        return __awaiter(this, void 0, void 0, function* () {
            return "0x000";
        });
    }
    // process the question
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            let p1Hashes = [];
            let p2Hashes = [];
            try {
                p1Hashes = yield this.archivist.blockHashes(this.p1);
                p2Hashes = yield this.archivist.blockHashes(this.p2);
            }
            catch (error) {
                throw new Error("Failed to Retreive Hashes");
            }
            const intersection = IntersectionQuestion.getStringArrayIntersection(p1Hashes, p2Hashes);
            if (intersection.length > 0) {
                return true;
            }
            return false;
        });
    }
}
exports.IntersectionQuestion = IntersectionQuestion;
//# sourceMappingURL=index.js.map