"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function interseectionListResolvers() {
    return {
        AddressList: {
            meta(parent, args, context, info) {
                console.log("resolvers.IntersectionList.meta");
                return parent.meta;
            },
            items(parent, args, context, info) {
                console.log(`resolvers.IntersectionList.items`);
                return parent.items;
            }
        }
    };
}
exports.interseectionListResolvers = interseectionListResolvers;
//# sourceMappingURL=intersectionlist.js.map