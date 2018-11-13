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
const archivist_1 = require("../../client/archivist");
class QuestionList extends __1.default {
    constructor(context) {
        super();
        this.items = [];
        this.context = context({ req: {} });
    }
    static initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            QuestionList.runner = yield QuestionList.createRunner();
        });
    }
    static reportTimedout(itemA, itemB, beneficiary) {
        return __awaiter(this, void 0, void 0, function* () {
            const from = sc.getCurrentUser();
            console.log('Reporting Timed Out: ', from);
            yield QuestionList.contract.methods.refundPayment(itemA, itemB, beneficiary)
                .send({ from, gas: 6986331, gasPrice: 40000000000 });
        });
    }
    static reportIntersected(itemA, itemB, beneficiary) {
        return __awaiter(this, void 0, void 0, function* () {
            const from = sc.getCurrentUser();
            console.log('Reporting Intersected: ', from);
            yield QuestionList.contract.methods.payForDelivery(itemA, itemB, beneficiary)
                .send({ from, gasLimit: 6986331, gasPrice: 40000000000 });
        });
    }
    static createRunner() {
        return __awaiter(this, void 0, void 0, function* () {
            yield sc.reloadWeb3('1', 'QmS76L77m9Dd3esNxShUoAGW7EWpmZ2M663wdUTVhNFLpg');
            QuestionList.contract = yield sc.contractNamed('PayOnDelivery');
            console.log('Smart Contract Loaded!');
        });
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            if (QuestionList.contract) {
                console.log('... .. ...');
                try {
                    const question = yield QuestionList.contract.methods.questions(0).call();
                    const questionObj = new onintersect_1.OnIntersectQuestion({
                        partyOne: question.itemA,
                        partyTwo: question.itemB,
                        markers: [question.marker],
                        direction: intersection_1.Direction.Forward,
                        archivists: [new archivist_1.ArchivistClient({ uri: this.context.archivists[0] })],
                        beneficiary: question.beneficiary
                    });
                    this.items.push(questionObj);
                    console.log(`read: ${this.items.length} Questions Found`);
                }
                catch (ex) {
                    console.log('read: No Questions Found');
                }
            }
            return true;
        });
    }
}
exports.QuestionList = QuestionList;
//# sourceMappingURL=index.js.map