"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class XYError {
    constructor(code, message, exception) {
        this.code = code;
        this.message = message;
        this.exception = exception;
        this.report();
    }
    report() {
        console.error(`ERROR[${this.code}]: ${this.message || "No Message"}`);
        if (this.exception) {
            console.error(`Exception Data: ${this.exception}`);
        }
    }
}
exports.XYError = XYError;
//# sourceMappingURL=error.js.map