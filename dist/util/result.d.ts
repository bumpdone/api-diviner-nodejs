import { XYError } from './error';
export declare class XYResult<T = any> {
    data: T;
    error?: XYError;
    constructor(data: T, error?: XYError);
    done(data: T): this;
    fail(code: number, message?: string, exception?: any): this;
}
