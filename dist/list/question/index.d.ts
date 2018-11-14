import List from '..';
import { Question } from '../../question';
export declare class QuestionList extends List {
    static contract: any;
    static runner: any;
    static initialize(): Promise<void>;
    static sendParams(from: string): {
        from: string;
        gas: number;
        gasPrice: number;
    };
    static reportTimeout(itemA: string, itemB: string, beneficiary: string): Promise<void>;
    static reportIntersected(itemA: string, itemB: string, beneficiary: string): Promise<void>;
    private static createRunner;
    items: Question[];
    private context;
    constructor(context: any);
    read(): Promise<any>;
}
