export default class About {
    name: string;
    version: string;
    url: string;
    address: string;
    ethAddress: string;
    seeds: {
        archivists: [];
        diviners: [];
    };
    scsc: {
        address: string;
        platform: string;
        network: string;
        abi: string;
        ipfs: string;
    };
    constructor(context: any);
}
