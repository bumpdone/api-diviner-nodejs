"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const version = process.env.REACT_APP_VERSION;
class LocalSettings {
    constructor() {
        this.settings = {
            api: "http://api.portal.xyo.network:12001",
            mock: false,
            network: "",
            contract: "",
            version
        };
        this.load();
    }
    getLocalStorage() {
        if (typeof (localStorage) !== "undefined") {
            return localStorage;
        }
        return null;
    }
    save() {
        const storage = this.getLocalStorage();
        if (storage) {
            storage.setItem("settings", JSON.stringify(this.settings));
        }
    }
    load() {
        const storage = this.getLocalStorage();
        if (storage) {
            const settings = JSON.parse(storage.getItem("settings") || "{}") || {};
            this.settings.api = settings.api || this.settings.api;
            this.settings.mock = settings.mock || this.settings.mock;
            this.settings.network = settings.network || this.settings.network;
            this.settings.contract = settings.contract || this.settings.contract;
        }
    }
}
exports.LocalSettings = LocalSettings;
//# sourceMappingURL=localSettings.js.map