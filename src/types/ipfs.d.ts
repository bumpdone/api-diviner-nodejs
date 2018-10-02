declare module 'ipfs' {
    class IPFS {
        on(status: string, callback: ((error: any) => void)): void
        start() : void
        stop(): void
        files: any
    }
    function createNode(): IPFS
}