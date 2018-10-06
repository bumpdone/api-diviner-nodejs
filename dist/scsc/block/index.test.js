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
const _1 = __importDefault(require("./"));
const chai_1 = require("chai");
describe('ScscBlock class', () => {
    const block = new _1.default({});
    it('should initially be invalid', () => __awaiter(this, void 0, void 0, function* () {
        const validation = block.validate();
        validation.messages.forEach((message) => { console.log(message); });
        chai_1.expect(validation.valid).to.equal(false);
        chai_1.expect(validation.messages.length).to.be.above(0);
    }));
});
//# sourceMappingURL=index.test.js.map