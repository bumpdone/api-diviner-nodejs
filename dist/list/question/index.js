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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
const sc = __importStar(require("../../util/SmartContractService"));
const onintersect_1 = require("../../question/onintersect");
const intersection_1 = require("../../question/intersection");
class QuestionList extends __1.default {
    constructor(context) {
        super();
        this.items = [];
        this.context = context;
    }
    static initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            QuestionList.runner = yield QuestionList.createRunner();
        });
    }
    static reportTimedout(itemA, itemB, beneficiary) {
        return __awaiter(this, void 0, void 0, function* () {
            const from = sc.getCurrentUser();
            yield QuestionList.contract.methods.refundPayment(itemA, itemB, beneficiary).send({ from });
        });
    }
    static reportIntersected(itemA, itemB, beneficiary) {
        return __awaiter(this, void 0, void 0, function* () {
            const from = sc.getCurrentUser();
            yield QuestionList.contract.methods.payForDelivery(itemA, itemB, beneficiary).send({ from });
        });
    }
    static createRunner() {
        return __awaiter(this, void 0, void 0, function* () {
            yield sc.reloadWeb3('42', 'QmXdwrnoWGV7uDEQ2HvrTALPoFkF39578HQzmB1CGeqDfT');
            QuestionList.contract = yield sc.contractNamed('PayOnDelivery');
            console.log('Smart Contract Loaded!');
        });
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Reading Questions...');
            if (QuestionList.contract) {
                console.log('Reading Questions [Really]...');
                try {
                    const questions = yield QuestionList.contract.methods.questions(0).call();
                    yield questions.forEach((question) => __awaiter(this, void 0, void 0, function* () {
                        const questionObj = new onintersect_1.OnIntersectQuestion({ partyOne: question.itemA, partyTwo: question.itemB, markers: [question.marker], direction: intersection_1.Direction.Forward, archivist: this.context.archivists, beneficiary: question.beneficiary });
                        this.items.push(questionObj);
                    }));
                    console.log(`read[Good]: ${this.items.length}`);
                }
                catch (ex) {
                    console.log(`read[Bad]: ${ex}`);
                }
            }
            return true;
        });
    }
}
exports.QuestionList = QuestionList;
//# sourceMappingURL=index.js.map