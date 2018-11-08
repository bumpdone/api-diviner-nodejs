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
const contractNamed = sc.contractNamed;
class QuestionList extends __1.default {
    constructor(context) {
        super();
        this.items = [];
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            this.runner().then(() => {
                const contract = sc.contractNamed('PayOnDelivery');
                console.log('Smart Contract', contract);
            });
            return true;
        });
    }
    runner() {
        return __awaiter(this, void 0, void 0, function* () {
            return sc.reloadWeb3('5777', 'QmWBZp6NbGB3u8CYaWYA6JMcPx8oYQCizzWw8UZzErb2tv');
        });
    }
}
exports.QuestionList = QuestionList;
//# sourceMappingURL=index.js.map