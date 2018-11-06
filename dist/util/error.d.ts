export declare class XYError {
    code: number;
    message?: string;
    exception?: any;
    constructor(code: number, message?: string, exception?: any);
    private report;
}
