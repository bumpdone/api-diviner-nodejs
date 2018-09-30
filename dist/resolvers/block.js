"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function blockResolvers() {
    return {
        Block: {
            hash(parent, args, context, info) {
                console.log("resolvers.Block.hash");
                return parent.hash;
            }
        }
    };
}
exports.blockResolvers = blockResolvers;
//# sourceMappingURL=block.js.map