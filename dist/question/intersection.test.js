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
const intersection_1 = require("./intersection");
const chai_1 = require("chai");
describe('IntersectionQuestion class', () => {
    it('should return true for question', () => __awaiter(this, void 0, void 0, function* () {
        const question = new intersection_1.IntersectionQuestion(['0401eb53c8483ab1229aa7984aeb2cff61861a9f790dcd10b96f6e5f8c232ade8031852ca1d37dba68b6d073502db6144a0e1117fb3b7455c8ef96f22c97bd0b24ee'], ['04019d976a3575d93bbbaca79b2cc6e5d118fd0d3e7dab1f031525ce5901d9856733374e68fff1c58c6d1d9f10138df9e1f1aa18df1448ee75bab05a66c6ea9da4ce']);
        const answer = question.process();
        chai_1.expect(answer).to.equal(true);
    }));
});
//# sourceMappingURL=intersection.test.js.map