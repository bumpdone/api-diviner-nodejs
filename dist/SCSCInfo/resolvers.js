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
function scscInfoResolvers() {
    return {
        SCSCInfo: {
            abi(parent, args, context, info) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log('resolvers.ScscInfo.abi');
                    const abi = yield parent.getABI();
                    return JSON.stringify(abi);
                });
            },
            bytecode(parent, args, context, info) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log('resolvers.ScscInfo.abi');
                    const abi = yield parent.getBytecode();
                    return abi;
                });
            }
        }
    };
}
exports.default = scscInfoResolvers;
//# sourceMappingURL=resolvers.js.map