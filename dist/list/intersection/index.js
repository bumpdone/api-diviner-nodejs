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
const intersection_1 = require("../../intersection");
const __1 = __importDefault(require(".."));
class IntersectionList extends __1.default {
    constructor(addresses) {
        super();
        this.addresses = addresses;
        this.items = [];
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            this.items.push(new intersection_1.Intersection("2018-09-14T12:43:37+0700", 10));
            return this;
        });
    }
}
exports.IntersectionList = IntersectionList;
//# sourceMappingURL=index.js.map