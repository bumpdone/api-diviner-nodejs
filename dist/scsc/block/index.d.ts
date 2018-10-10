/// <reference types="node" />
import { IPFS } from 'ipfs';
import Options from "./options";
import Data from "./data";
import Header from './header';
import Payment from './payment';
interface Validation {
    valid: boolean;
    messages: string[];
}
export default class ScscBlock {
    hash?: string;
    bytes?: Buffer;
    ipfs?: IPFS;
    data?: Data;
    constructor(options?: Options);
    read(): Promise<void>;
    concatValidation(v1: Validation, v2: Validation): Validation;
    isValidAddress(address: string): boolean;
    validateHeader(header?: Header): Validation;
    validateHashes(hashes?: string[]): Validation;
    validatePayments(payments?: Payment[]): Validation;
    validate(): Validation;
    write(): Promise<void>;
}
export {};
