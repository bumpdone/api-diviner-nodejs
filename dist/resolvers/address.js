"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = require("../addresses/address");
const addresses_1 = require("../addresses/addresses");
function addressResolvers() {
    return {
        Address: {
            owner(parent, args, context, info) {
                console.log(`resolvers.Address.owner`);
                if (parent.owner) {
                    return new address_1.Address(parent.owner, context.database).read();
                }
            },
            owned(parent, args, context, info) {
                console.log(`resolvers.Address.owned}`);
                return new addresses_1.Addresses(parent.address, context.database).read();
            }
        }
    };
}
exports.addressResolvers = addressResolvers;
//# sourceMappingURL=address.js.map