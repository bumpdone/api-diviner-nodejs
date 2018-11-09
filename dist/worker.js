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
const question_1 = require("./list/question");
class DivinerWorker {
    start(interval = 5000, context = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Starting Looper...');
            this.context = context;
            yield question_1.QuestionList.initialize();
            if (this.timer) {
                console.log('Worker already started...');
            }
            else {
                this.timer = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                    console.log('Looper1');
                    yield this.looper();
                    console.log('Looper2');
                }), interval);
            }
        });
    }
    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        else {
            console.log('Worker already stopped...');
        }
    }
    looper() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Looking for Questions...');
            const questions = new question_1.QuestionList(this.context);
            yield questions.read();
            yield questions.items.forEach((question) => __awaiter(this, void 0, void 0, function* () {
                console.log(`Processing Question: ${question.name}`);
                const intersected = yield question.process();
                console.log(`Processed Question: ${intersected}`);
                if (intersected) {
                    yield question_1.QuestionList.reportIntersected(question.p1, question.p2, question.beneficiary);
                }
            }));
        });
    }
}
exports.DivinerWorker = DivinerWorker;
//# sourceMappingURL=worker.js.map