import List from '..';
import { Question } from '../../question';
export declare class QuestionList extends List {
    static contract: any;
    static runner: Promise<void>;
    private static createRunner;
    items: Question[];
    constructor(context: any);
    read(): Promise<any>;
}
