"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function listResolvers() {
    return {
        List: {
            __resolveType(parent, args, context, info) {
                console.log('resolvers.List.type');
                return context.listItemType;
            }
        }
    };
}
exports.default = listResolvers;
//# sourceMappingURL=resolvers.js.map