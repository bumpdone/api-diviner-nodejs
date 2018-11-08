"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function archivistListResolvers() {
    return {
        AddressList: {
            meta(parent, args, context, info) {
                console.log('resolvers.ArchivistList.meta');
                return parent.meta;
            },
            items(parent, args, context, info) {
                console.log('resolvers.ArchivistList.items');
                return parent.items;
            }
        }
    };
}
exports.archivistListResolvers = archivistListResolvers;
//# sourceMappingURL=resolvers.js.map