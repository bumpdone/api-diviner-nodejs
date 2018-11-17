"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ipfs_api_1 = __importDefault(require("ipfs-api"));
const ipfs = new ipfs_api_1.default({
    host: 'ipfs.xyo.network',
    port: 5002,
    protocol: 'https',
});
const getIpfsAsync = (hash) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        ipfs.get(hash, (err, files) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(files);
            }
        });
    });
});
exports.downloadFilesFromIpfs = (ipfsHash) => __awaiter(this, void 0, void 0, function* () {
    console.log('downloadFilesFromIpfs: ', ipfsHash);
    const abi = [];
    const files = yield getIpfsAsync(ipfsHash);
    files.forEach((file) => {
        if (file.content) {
            abi.push({ data: JSON.parse(String(file.content)) });
        }
    });
    return abi;
});
//# sourceMappingURL=IPFSReader.js.map