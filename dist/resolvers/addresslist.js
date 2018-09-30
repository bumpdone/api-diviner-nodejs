"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addressListResolvers() {
    return {
        AddressList: {
            meta(parent, args, context, info) {
                console.log("resolvers.AddressList.meta");
                return parent.meta;
            },
            items(parent, args, context, info) {
                console.log(`resolvers.AddressList.items`);
                return parent.items;
            }
        }
    };
}
exports.addressListResolvers = addressListResolvers;
//# sourceMappingURL=addresslist.js.map