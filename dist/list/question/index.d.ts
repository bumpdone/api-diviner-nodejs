import List from '..';
import { Question } from '../../question';
export declare class QuestionList extends List {
    items: Question[];
    constructor(context: any);
    read(): Promise<any>;
    private runner;
}
