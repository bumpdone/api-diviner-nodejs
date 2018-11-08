"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const question_1 = require("./list/question");
class DivinerWorker {
    start(interval = 5000, context = {}) {
        if (this.timer) {
            console.log('Worker already started...');
        }
        else {
            this.timer = setInterval(() => {
                this.looper();
            }, interval);
        }
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
        console.log('Looking for Questions...');
        const questions = new question_1.QuestionList(this.context);
        questions.read();
        questions.items.forEach((question) => {
            console.log(`Processing Question: ${question.name}`);
            question.process();
        });
    }
}
exports.DivinerWorker = DivinerWorker;
//# sourceMappingURL=worker.js.map