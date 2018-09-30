"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addresslist_1 = require("../lists/addresslist");
function addressesResolvers() {
    return {
        Addresses: {
            accounts(parent, args, context, info) {
                console.log(`resolvers.Addresses.accounts`);
                return new addresslist_1.AddressList(parent.owner, { account: true }, context.database).read();
            },
            addresses(parent, args, context, info) {
                console.log(`resolvers.Addresses.addresses`);
                return new addresslist_1.AddressList(parent.owner, null, context.database).read();
            },
            sentinels(parent, args, context, info) {
                console.log(`resolvers.Addresses.sentinels`);
                return new addresslist_1.AddressList(parent.owner, { sentinel: true }, context.database).read();
            },
            bridges(parent, args, context, info) {
                console.log(`resolvers.Addresses.bridges`);
                return new addresslist_1.AddressList(parent.owner, { bridge: true }, context.database).read();
            },
            archivists(parent, args, context, info) {
                console.log(`resolvers.Addresses.archivists`);
                return new addresslist_1.AddressList(parent.owner, { archivist: true }, context.database).read();
            },
            diviners(parent, args, context, info) {
                console.log(`resolvers.Addresses.diviners`);
                return new addresslist_1.AddressList(parent.owner, { diviner: true }, context.database).read();
            }
        }
    };
}
exports.addressesResolvers = addressesResolvers;
//# sourceMappingURL=addresses.js.map