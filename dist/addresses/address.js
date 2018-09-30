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
const addresses_1 = require("./addresses");
class Address {
    constructor(address, db) {
        this.address = address;
        this.db = db;
        this.owned = new addresses_1.Addresses(address, db);
    }
    update(database) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Address.update: ${this.address}`);
            const addresesRef = database.collection('addresses');
            addresesRef.doc(this.address).set({});
            return this;
        });
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Address.read`);
            if (this.db) {
                const addressesRef = this.db.collection('addresses');
                const doc = yield addressesRef.doc(this.address).get();
                if (doc.exists) {
                    Object.assign(this, doc.data());
                }
            }
            return this;
        });
    }
}
exports.Address = Address;
//# sourceMappingURL=address.js.map