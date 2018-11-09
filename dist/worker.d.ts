export declare class DivinerWorker {
    private timer?;
    private context;
    start(interval?: number, context?: any): Promise<void>;
    stop(): void;
    private looper;
}
