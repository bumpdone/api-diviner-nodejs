"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function listMetaResolvers() {
    return {
        ListMeta: {
            totalCount(parent, args, context, info) {
                console.log("resolvers.ListMeta.totalCount");
                return parent.totalCount;
            },
            endCursor(parent, args, context, info) {
                return parent.endCursor;
            },
            hasNextPage(parent, args, context, info) {
                return parent.hasNextPage;
            }
        }
    };
}
exports.listMetaResolvers = listMetaResolvers;
//# sourceMappingURL=resolver.js.map