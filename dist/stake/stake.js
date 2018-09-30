"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Stake {
    static from(amount) {
        return new Stake(amount);
    }
    constructor(amount) {
        this.amount = amount;
    }
}
exports.Stake = Stake;
//# sourceMappingURL=stake.js.map