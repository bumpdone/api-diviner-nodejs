"use strict";
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
exports.downloadFiles = (ipfsHash) => {
    return new Promise((resolve, reject) => {
        const abi = [];
        ipfs.get(ipfsHash, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            try {
                files.forEach((file) => {
                    if (file.content) {
                        abi.push({ data: JSON.parse(String(file.content)) });
                    }
                });
            }
            catch (err) {
                reject(err);
                return;
            }
            resolve(abi);
        });
    });
};
//# sourceMappingURL=IPFSReader.js.map