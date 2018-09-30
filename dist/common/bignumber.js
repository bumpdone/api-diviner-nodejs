"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BigNumber {
    static from(value, decimals) {
        return new BigNumber(value, decimals);
    }
    constructor(value, decimals) {
        this.value = value;
        this.decimals = decimals;
    }
}
exports.BigNumber = BigNumber;
//# sourceMappingURL=bignumber.js.map