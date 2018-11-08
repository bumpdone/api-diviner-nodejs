import { IntersectionQuestion } from '../intersection';
export declare class OnIntersectQuestion extends IntersectionQuestion {
    process(): Promise<any>;
    private didTimeout;
}
