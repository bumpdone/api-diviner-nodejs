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
const __1 = require("..");
var Direction;
(function (Direction) {
    Direction[Direction["Forward"] = 0] = "Forward";
    Direction[Direction["Backward"] = 1] = "Backward";
    Direction[Direction["Both"] = 2] = "Both";
})(Direction = exports.Direction || (exports.Direction = {}));
class IntersectionQuestion extends __1.Question {
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
    // removal is inclusive
    static removePreceedingDataByHash(hashes, marker) {
        let result = hashes;
        hashes.every((item, index) => {
            if (item === marker) {
                result = (index + 1 === hashes.length) ?
                    result = [] : result = hashes.slice(index + 1);
                return false; // end every
            }
            return true;
        });
        return result;
    }
    // removal is inclusive
    static removeSubsequentDataByHash(hashes, marker) {
        let result = hashes;
        hashes.every((item, index) => {
            if (item === marker) {
                result = (index === 0) ?
                    result = [] : result = hashes.slice(0, index);
                return false; // end every
            }
            return true;
        });
        return result;
    }
    static removeData(hashes, markers, proc) {
        let prunedHashes = hashes;
        markers.forEach((marker) => {
            prunedHashes = proc(prunedHashes, marker);
        });
        return prunedHashes;
    }
    constructor(params) {
        super();
        this.type = 'intersection';
        this.p1 = params.partyOne;
        this.p2 = params.partyTwo;
        this.markers = params.markers || [];
        this.direction = params.direction || Direction.Forward;
        this.archivist = params.archivists[0];
    }
    // publish the question to scsc
    publish() {
        return __awaiter(this, void 0, void 0, function* () {
            return '0x000';
        });
    }
    didIntersect() {
        return __awaiter(this, void 0, void 0, function* () {
            let p1Hashes = [];
            let p2Hashes = [];
            try {
                p1Hashes = yield this.archivist.blockHashes(this.p1);
                p2Hashes = yield this.archivist.blockHashes(this.p2);
            }
            catch (error) {
                throw new Error(`Failed to Retreive Hashes: ${error}`);
            }
            let proc;
            switch (this.direction) {
                case Direction.Forward:
                    proc = IntersectionQuestion.removePreceedingDataByHash;
                    break;
                case Direction.Backward:
                    proc = IntersectionQuestion.removeSubsequentDataByHash;
                    break;
            }
            p1Hashes = IntersectionQuestion.removeData(p1Hashes, this.markers, proc);
            p2Hashes = IntersectionQuestion.removeData(p2Hashes, this.markers, proc);
            const intersection = IntersectionQuestion.getStringArrayIntersection(p1Hashes, p2Hashes);
            if (intersection.length > 0) {
                return true;
            }
            return false;
        });
    }
    // process the question
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.didIntersect();
        });
    }
}
exports.IntersectionQuestion = IntersectionQuestion;
//# sourceMappingURL=index.js.map