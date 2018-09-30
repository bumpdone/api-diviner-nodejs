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
const addresslist_1 = require("../lists/addresslist");
class Addresses {
    static from(owner, database) {
        return new Addresses(owner, database);
    }
    constructor(owner, database) {
        this.owner = owner;
    }
    addresses() {
        return new addresslist_1.AddressList(this.owner, null, this.database);
    }
    sentinels() {
        return new addresslist_1.AddressList(this.owner, { sentinel: true }, this.database);
    }
    bridges() {
        return new addresslist_1.AddressList(this.owner, { bridge: true }, this.database);
    }
    archivists() {
        return new addresslist_1.AddressList(this.owner, { archivist: true }, this.database);
    }
    diviners() {
        return new addresslist_1.AddressList(this.owner, { diviner: true }, this.database);
    }
    accounts() {
        return new addresslist_1.AddressList(this.owner, { account: true }, this.database);
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            return this;
        });
    }
}
exports.Addresses = Addresses;
//# sourceMappingURL=addresses.js.map