export default class About {
    name: string;
    version: string;
    url: string;
    address: string;
    seeds: {
        archivists: [];
        diviners: [];
    };
    constructor(options: {
        name: string;
        version: string;
        url: string;
        address: string;
        seeds: {
            archivists: [];
            diviners: [];
        };
    });
}
