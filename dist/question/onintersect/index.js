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
const intersection_1 = require("../intersection");
class OnIntersectQuestion extends intersection_1.IntersectionQuestion {
    constructor(params) {
        super(params);
        this.beneficiary = params.beneficiary;
    }
    // process the question
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            const didInteract = yield this.didIntersect();
            const didTimeout = this.didTimeout();
            return didInteract ? true : (didTimeout ? false : null);
        });
    }
    didTimeout() {
        return false;
    }
}
exports.OnIntersectQuestion = OnIntersectQuestion;
//# sourceMappingURL=index.js.map