"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./error");
class XYResult {
    constructor(data, error) {
        this.data = data;
        this.error = error;
    }
    done(data) {
        this.data = data;
        return this;
    }
    fail(code, message, exception) {
        this.error = new error_1.XYError(code, message, exception);
        return this;
    }
}
exports.XYResult = XYResult;
//# sourceMappingURL=result.js.map