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
const addresslist_1 = require("../lists/addresslist");
const filter_1 = require("../lists/filter");
function xyoResolvers() {
    return {
        Xyo: {
            accounts: (parent, args, context, info) => __awaiter(this, void 0, void 0, function* () {
                console.log("resolvers.Xyo.accounts");
                const filter = new filter_1.Filter();
                filter.account = true;
                return new addresslist_1.AddressList(null, filter, context.database);
            }),
            address(parent, args, context, info) {
                console.log("resolvers.Xyo.address");
                return new address_1.Address(args.address);
            },
            addresses(parent, args, context, info) {
                console.log("resolvers.Xyo.addresses");
                return new addresslist_1.AddressList(null, null, context.database).read();
            },
            sentinels(parent, args, context, info) {
                console.log("resolvers.Xyo.sentinels");
                const filter = new filter_1.Filter();
                filter.sentinel = true;
                return new addresslist_1.AddressList(null, filter, context.database);
            },
            bridges(parent, args, context, info) {
                console.log("resolvers.Xyo.bridges");
                const filter = new filter_1.Filter();
                filter.bridge = true;
                return new addresslist_1.AddressList(null, filter, context.database);
            },
            archivists(parent, args, context, info) {
                console.log("resolvers.Xyo.archivists");
                const filter = new filter_1.Filter();
                filter.archivist = true;
                return new addresslist_1.AddressList(null, filter, context.database);
            },
            diviners(parent, args, context, info) {
                console.log("resolvers.Xyo.diviners");
                const filter = new filter_1.Filter();
                filter.diviner = true;
                return new addresslist_1.AddressList(null, filter, context.database);
            }
        }
    };
}
exports.xyoResolvers = xyoResolvers;
//# sourceMappingURL=xyo.js.map