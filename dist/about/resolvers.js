"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function aboutResolvers() {
    return {
        About: {
            name(parent, args, context, info) {
                console.log("resolvers.About.name");
                return parent.name;
            },
            version(parent, args, context, info) {
                console.log("resolvers.About.version");
                return parent.version;
            },
            url(parent, args, context, info) {
                console.log("resolvers.About.url");
                return JSON.stringify(context);
            }
        }
    };
}
exports.aboutResolvers = aboutResolvers;
//# sourceMappingURL=resolvers.js.map