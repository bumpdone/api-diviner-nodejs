"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ScscBlock {
    constructor(options) {
        if (options) {
            this.ipfs = options.ipfs;
            this.hash = options.hash;
            if (options.data) {
                this.data = options.data;
            }
        }
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.ipfs) {
                this.ipfs.files.get(this.hash);
            }
            else {
                throw Error('IPFS needed to read');
            }
        });
    }
    concatValidation(v1, v2) {
        const v = { valid: true, messages: [] };
        v.valid = v1.valid && v2.valid;
        v.messages.concat(v1.messages);
        v.messages.concat(v2.messages);
        return v;
    }
    isValidAddress(address) {
        return address.length === 40;
    }
    validateHeader(header) {
        const validation = { valid: true, messages: [] };
        if (header) {
            if (!this.isValidAddress(header.address)) {
                validation.valid = false;
                validation.messages.push('Invalid Address in Header');
            }
        }
        else {
            validation.messages.push('Missing Header');
            validation.valid = false;
        }
        return validation;
    }
    validateHashes(hashes) {
        const validation = { valid: true, messages: [] };
        if (!hashes) {
            validation.messages.push('Missing Hashes');
            validation.valid = false;
        }
        return validation;
    }
    validatePayments(payments) {
        const validation = { valid: true, messages: [] };
        if (!payments) {
            validation.messages.push('Missing Payments');
            validation.valid = false;
        }
        return validation;
    }
    validate() {
        let validation = { valid: true, messages: [] };
        const data = this.data;
        if (data) {
            validation = this.concatValidation(validation, this.validateHeader(data.header));
            validation = this.concatValidation(validation, this.validateHashes(data.hashes));
            validation = this.concatValidation(validation, this.validatePayments(data.payments));
        }
        else {
            validation.messages.push('Missing Data');
            validation.valid = false;
        }
        return validation;
    }
    write() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.ipfs) {
                const validation = this.validate();
                if (validation.valid) {
                    this.hash = this.ipfs.files.put(this.data);
                }
                else {
                    throw Error('Write Failed. Invalid Data');
                }
            }
            else {
                throw Error('IPFS needed to write');
            }
        });
    }
}
exports.default = ScscBlock;
//# sourceMappingURL=index.js.map