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
const _1 = require(".");
const chai_1 = require("chai");
describe('IntersectionQuestion class (getStringArrayIntersection)', () => {
    it('should return intersection of one', () => __awaiter(this, void 0, void 0, function* () {
        const list1 = ["a1", "b1", "c1", "d1"];
        const list2 = ["a1", "b2", "c2", "d2"];
        const intersection = _1.IntersectionQuestion.getStringArrayIntersection(list1, list2);
        chai_1.expect(intersection.length).to.equal(1);
        chai_1.expect(intersection[0]).to.equal("a1");
    }));
    it('should return intersection of one', () => __awaiter(this, void 0, void 0, function* () {
        const list1 = ["a1", "b1", "c1", "d1"];
        const list2 = ["a2", "b2", "c1", "d2"];
        const intersection = _1.IntersectionQuestion.getStringArrayIntersection(list1, list2);
        chai_1.expect(intersection.length).to.equal(1);
        chai_1.expect(intersection[0]).to.equal("c1");
    }));
    it('should return intersection of one', () => __awaiter(this, void 0, void 0, function* () {
        const list1 = ["a1", "b1", "c1", "d2"];
        const list2 = ["a2", "b2", "c2", "d2"];
        const intersection = _1.IntersectionQuestion.getStringArrayIntersection(list1, list2);
        chai_1.expect(intersection.length).to.equal(1);
        chai_1.expect(intersection[0]).to.equal("d2");
    }));
    it('should return intersection of one', () => __awaiter(this, void 0, void 0, function* () {
        const list1 = ["a1", "b1", "c1", "d1"];
        const list2 = ["c2", "d2", "a1", "f2"];
        const intersection = _1.IntersectionQuestion.getStringArrayIntersection(list1, list2);
        chai_1.expect(intersection.length).to.equal(1);
        chai_1.expect(intersection[0]).to.equal("a1");
    }));
    it('should return intersection of two', () => __awaiter(this, void 0, void 0, function* () {
        const list1 = ["a1", "b1", "c1", "d1"];
        const list2 = ["c1", "d1", "e2", "f2"];
        const intersection = _1.IntersectionQuestion.getStringArrayIntersection(list1, list2);
        chai_1.expect(intersection.length).to.equal(2);
        chai_1.expect(intersection[0]).to.equal("c1");
        chai_1.expect(intersection[1]).to.equal("d1");
    }));
    it('should return intersection of none', () => __awaiter(this, void 0, void 0, function* () {
        const list1 = ["a1", "b1", "c1", "d1"];
        const list2 = ["a2", "b2", "c2", "d2"];
        const intersection = _1.IntersectionQuestion.getStringArrayIntersection(list1, list2);
        chai_1.expect(intersection.length).to.equal(0);
    }));
});
describe('IntersectionQuestion class (removePreceedingDataByHash)', () => {
    it('should remove one', () => __awaiter(this, void 0, void 0, function* () {
        const list = ["a1", "a2", "a3", "a4", "a5"];
        const hash = "a1";
        const hashes = _1.IntersectionQuestion.removePreceedingDataByHash(list, hash);
        chai_1.expect(hashes.length).to.equal(list.length - 1);
        chai_1.expect(hashes[0]).to.equal("a2");
    }));
    it('should remove all', () => __awaiter(this, void 0, void 0, function* () {
        const list = ["a1", "a2", "a3", "a4", "a5"];
        const hash = "a5";
        const hashes = _1.IntersectionQuestion.removePreceedingDataByHash(list, hash);
        chai_1.expect(hashes.length).to.equal(0);
    }));
    it('should remove all but one', () => __awaiter(this, void 0, void 0, function* () {
        const list = ["a1", "a2", "a3", "a4", "a5"];
        const hash = "a4";
        const hashes = _1.IntersectionQuestion.removePreceedingDataByHash(list, hash);
        chai_1.expect(hashes.length).to.equal(1);
        chai_1.expect(hashes[0]).to.equal("a5");
    }));
});
describe('IntersectionQuestion class (removeSubsequentDataByHash)', () => {
    it('should remove one', () => __awaiter(this, void 0, void 0, function* () {
        const list = ["a1", "a2", "a3", "a4", "a5"];
        const hash = "a5";
        const hashes = _1.IntersectionQuestion.removeSubsequentDataByHash(list, hash);
        chai_1.expect(hashes.length).to.equal(list.length - 1);
        chai_1.expect(hashes[3]).to.equal("a4");
    }));
    it('should remove all', () => __awaiter(this, void 0, void 0, function* () {
        const list = ["a1", "a2", "a3", "a4", "a5"];
        const hash = "a1";
        const hashes = _1.IntersectionQuestion.removeSubsequentDataByHash(list, hash);
        chai_1.expect(hashes.length).to.equal(0);
    }));
    it('should remove all but one', () => __awaiter(this, void 0, void 0, function* () {
        const list = ["a1", "a2", "a3", "a4", "a5"];
        const hash = "a2";
        const hashes = _1.IntersectionQuestion.removeSubsequentDataByHash(list, hash);
        chai_1.expect(hashes.length).to.equal(1);
        chai_1.expect(hashes[0]).to.equal("a1");
    }));
});
//# sourceMappingURL=index.test.js.map