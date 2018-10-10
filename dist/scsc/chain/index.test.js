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
const _1 = __importDefault(require("./"));
const ipfs_1 = require("ipfs");
const chai_1 = require("chai");
describe('ScscChain class', () => {
    const startIpfs = () => {
        const newIpfs = ipfs_1.createNode();
        return new Promise((resolve, reject) => {
            newIpfs.on('ready', () => __awaiter(this, void 0, void 0, function* () {
                console.log("IPFS Ready");
                resolve(newIpfs);
            }));
            newIpfs.on('error', (error) => __awaiter(this, void 0, void 0, function* () {
                console.log("IPFS Error");
                reject(error);
            }));
        });
    };
    const stopIpfs = (oldIpfs) => {
        oldIpfs.stop();
        return new Promise((resolve, reject) => {
            oldIpfs.on('stop', () => __awaiter(this, void 0, void 0, function* () {
                console.log("IPFS Stopped");
                resolve(oldIpfs);
            }));
            oldIpfs.on('error', (error) => __awaiter(this, void 0, void 0, function* () {
                console.log("IPFS Error");
                reject(error);
            }));
        });
    };
    let scsc;
    let ipfs;
    it('should return create ScscChain', () => __awaiter(this, void 0, void 0, function* () {
        ipfs = yield startIpfs();
        console.log('3');
        scsc = new _1.default({
            contract: "",
            network: "",
            previousHash: "",
            address: "",
            ipfs
        });
        chai_1.expect(scsc).to.be.an('object');
    })).timeout(20000); // timeout is since it is slow on circleci
    it('should add item', () => __awaiter(this, void 0, void 0, function* () {
        chai_1.expect(yield scsc.addItem(Buffer.from("Hello"))).to.equal(true);
    }));
    let hash;
    it('should mine block', () => __awaiter(this, void 0, void 0, function* () {
        hash = yield scsc.mine();
        console.log(`Hash: ${hash}`);
        chai_1.expect(hash).to.be.a('string');
    }));
    let block;
    it('should get block', () => __awaiter(this, void 0, void 0, function* () {
        block = yield scsc.getBlock(hash);
        if (block) {
            chai_1.expect(block.data).to.be.a('object');
        }
    }));
    it('should stop ipfs', () => __awaiter(this, void 0, void 0, function* () {
        const oldIpfs = yield stopIpfs(ipfs);
        chai_1.expect(oldIpfs).to.be.a('object');
    }));
});
//# sourceMappingURL=index.test.js.map