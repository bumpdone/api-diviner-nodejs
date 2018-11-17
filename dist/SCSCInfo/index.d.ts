export declare class ScscInfo {
    name: string;
    address: string;
    platform: string;
    network: string;
    ipfs: string;
    constructor(options: {
        address?: string;
        platform?: string;
        network?: string;
        ipfs?: string;
    });
    private contracts;
    loadContractsFromIpfs(): Promise<number>;
    getABI(name?: string): Promise<any>;
    getBytecode(name?: string): Promise<any>;
}
