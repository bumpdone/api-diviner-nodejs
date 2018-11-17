export declare class Scsc {
    private ipfsHash;
    private defaultName;
    constructor(ipfsHash: string, defaultName: string);
    private contracts;
    private reportAddingContract;
    loadContractsFromIpfs(): Promise<number>;
    getABI(name?: string): Promise<any>;
    getBytecode(name?: string): Promise<any>;
}
