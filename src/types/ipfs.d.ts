declare module 'ipfs' {
    class IPFS {
        constructor(options?:any)
        on(status: string, callback: ((error: any) => void)): void
        start() : void
        stop(): void
        files: any
        block: any
        dag: any
        object: any
        pin: any
        name: any
        key: any
        bootstrap: any
        bitswap: any
        pubsub: any
        swarm: any
        id(callback: any): any
        version(callback: any): any
        ping(peerId: any, options: any, callback: any): any
        pingReadableStream(peerId: any, options: any): any
        pingPullStream(peerId: any, options: any): any
        init(options: any, callback: any): any
        start(callback: any): any
        stop(callback: any): any
        isOnline(): any
        resolve(name: any, options: any, callback: any): any
        repo: any
        stats: any
        config: any
        util: any
    }
    function createNode(): IPFS
}