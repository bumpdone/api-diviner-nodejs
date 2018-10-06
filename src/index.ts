import { ApolloServer, gql, Config, CorsOptions } from 'apollo-server'
import { IResolvers } from 'graphql-tools'
import { listResolvers } from './resolvers/list'
import { listMetaResolvers } from './resolvers/listmeta'
import { blockResolvers } from './resolvers/block'
import { importSchema } from 'graphql-import'
import { Block } from './block'
import { IntersectionList } from './list/intersection'
import { IntersectionQuestion } from './question/intersection'
import path from 'path'
import { merge } from 'lodash'
import { inspect } from 'util'
import { About } from './about'
import { createNode } from 'ipfs'
import yargs from 'yargs'

export class DivinerApi {

  public server: ApolloServer
  public ipfs: any
  public archivists: string[] = []

  public resolvers: IResolvers =  merge([
    {
      Query: {
        async about(parent: any, args: any, context: any, info: any) {
          console.log(`resolvers.Query.about`)
          return new About("Diviner", "0.1.0")
        },
        async block(parent: any, args: any, context: any, info: any) {
          console.log(`resolvers.Query.block: ${args.hash}`)
          if (!args.hash) {
            return new Block("0x0000", "0x0000", context.ipfs)
          }
          return new Block(args.hash, "0x0001", context.ipfs)
        },
        async intersections(addresses: [string]) {
          return new IntersectionList(["0x00", "0x11"])
        }
      },
      Mutation: {
        async questionHasIntersected(parent: any, args: any, context: any, info: any) {
          const q = new IntersectionQuestion(args.partyOneAddresses, args.partyTwoAddresses)
          return q.process()
        }
      }
    },
    listResolvers(),
    listMetaResolvers(),
    blockResolvers()
  ])

  constructor(seedArchivist: string) {
    const typeDefs = gql(this.buildSchema())

    this.archivists.push(seedArchivist)

    const context = ({ req }: {req: any}) => ({
      ipfs: this.ipfs
    })

    const config: Config & { cors?: CorsOptions | boolean } = {
      typeDefs,
      resolvers: this.resolvers,
      context
    }

    this.server = new ApolloServer(config)
  }

  public start(host: string = 'localhost', port: number = 12002) {

    console.log(" --- START ---")

    this.ipfs = createNode({ port: 1111 })

    this.ipfs.on('ready', () => {
      console.log('Ipfs is ready to use!')
    })

    this.ipfs.on('error', (error: any) => {
      console.log('Something went terribly wrong!', error)
    })

    this.ipfs.on('start', () => console.log('Ipfs started!'))

    this.server.listen({ host, port }).then(({ url }: {url: any}) => {
      console.log(`🚀  Server ready at ${url}`)
    })
  }

  private buildSchema() {
    const schemaLocation = path.join('.', 'graphql', 'root.graphql')
    const typeDefs = importSchema(schemaLocation)
    return typeDefs
  }
}

const argv = yargs
  .usage('$0 <cmd> [args]')
  .help()
  .command('start', "Start the Server", (args: any) => {
    return args
    .option('graphqlport', {
      describe: "The port that GraphQL will listen on",
      default: "12002",
      alias: "g"
    })
    .option('host', {
      describe: "The host that GraphQL will listen on",
      default: "localhost",
      alias: "h"
    })
    .option('archivist', {
      describe: "The url for an archivist for first contact",
      default: "http://localhost:11001",
      alias: "a"
    })
    .option('verbose', {
        alias: 'v',
        default: false,
    })
  }, (args: any) => {
    const xyo = new DivinerApi(args.archivist)
    xyo.start(args.host, args.graphqlport)
  })
  .argv
