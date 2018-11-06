export declare class LocalSettings {
    settings: {
        api: string;
        mock: boolean;
        network: string;
        contract: string;
        version: string | undefined;
    };
    constructor();
    getLocalStorage(): Storage | null;
    save(): void;
    load(): void;
}
