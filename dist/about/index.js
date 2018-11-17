"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class About {
    constructor(context) {
        this.name = 'Diviner';
        this.version = context.version;
        this.url = `http:${context.req.headers.host}`;
        this.address = context.address;
        this.ethAddress = context.ethAddress;
        this.seeds = context.seeds;
        this.scsc = context.scsc;
    }
}
exports.default = About;
//# sourceMappingURL=index.js.map