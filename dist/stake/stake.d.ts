import { BigNumber } from "../common/bignumber";
export declare class Stake {
    static from(amount: BigNumber): Stake;
    amount: BigNumber;
    constructor(amount: BigNumber);
}
