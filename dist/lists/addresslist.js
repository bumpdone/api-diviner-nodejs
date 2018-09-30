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
const address_1 = require("../addresses/address");
const listmeta_1 = require("../lists/listmeta");
class AddressList {
    constructor(owner, filter, db) {
        this.items = [];
        this.db = db;
        this.owner = owner;
        this.filter = filter;
        this.meta = new listmeta_1.ListMeta();
    }
    static resolvers() {
        return {
            meta(parent, args, context, info) {
                console.log("resolvers.AddressList.meta");
                return {};
            },
            items(parent, args, context, info) {
                console.log("resolvers.AddressList.items");
                return parent.items;
            }
        };
    }
    static asyncForEach(array) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`AddressList.asyncForEach`);
            const result = [];
            for (let index = 0; index < array.length; index++) {
                console.log(`AddressList.asyncForEach: ${index}`);
                result.push(yield array[index]);
            }
            return result;
        });
    }
    snapshotToArray(snapshot) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`AddressList.snapshotToArray`);
            const result = [];
            yield snapshot.forEach((child) => {
                const data = child.data();
                data.address = child.id;
                const address = new address_1.Address(data.address, this.db);
                Object.assign(address, data);
                result.push(address);
            });
            return result;
        });
    }
    getItems() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('AddressList.getItems');
            return this.items;
        });
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.db) {
                const addresesRef = this.db.collection('addresses');
                let query = addresesRef.limit(1000);
                if (this.owner) {
                    query = query.where('owner', '==', this.owner);
                }
                if (this.filter) {
                    if (this.filter.account) {
                        query = query.where('roles.account', '==', true);
                    }
                    if (this.filter.sentinel) {
                        query = query.where('roles.sentinel', '==', true);
                    }
                    if (this.filter.bridge) {
                        query = query.where('roles.bridge', '==', true);
                    }
                    if (this.filter.archivist) {
                        query = query.where('roles.archivist', '==', true);
                    }
                    if (this.filter.diviner) {
                        query = query.where('roles.diviner', '==', true);
                    }
                }
                const snapShot = yield query.get();
                console.log(`AddressList.read: ${snapShot.size}`);
                this.items = yield this.snapshotToArray(snapShot);
                this.meta.totalCount = snapShot.size;
                this.meta.hasNextPage = false;
                this.meta.endCursor = (snapShot.docs.length > 0) ?
                    snapShot.docs[snapShot.docs.length - 1].id : "";
            }
            return this;
        });
    }
}
exports.AddressList = AddressList;
//# sourceMappingURL=addresslist.js.map