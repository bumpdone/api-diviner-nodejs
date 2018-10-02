import { ApolloServer, gql, Config, CorsOptions } from 'apollo-server'
import { IResolvers } from 'graphql-tools'
import { listResolvers } from './resolvers/list'
import { listMetaResolvers } from './resolvers/listmeta'
import { blockResolvers } from './resolvers/block'
import { importSchema } from 'graphql-import'
import { Block } from './block'
import { IntersectionList } from './lists/intersectionlist'
import path from 'path'
import { merge } from 'lodash'
import { inspect } from 'util'
import { About } from './about'
import IPFS from 'ipfs'

export class XyoApi {

  public server: ApolloServer
  public ipfs = IPFS.createNode()

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
      }
    },
    listResolvers(),
    listMetaResolvers(),
    blockResolvers()
  ])

  constructor() {
    const typeDefs = gql(this.buildSchema())

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

  public start() {

    console.log(" --- START ---")

    this.ipfs.on('ready', () => {
      console.log('Ipfs is ready to use!')
    })

    this.ipfs.on('error', (error: any) => {
      console.log('Something went terribly wrong!', error)
    })

    this.ipfs.on('start', () => console.log('Ipfs started!'))

    this.server.listen(4001).then(({ url }: {url: any}) => {
      console.log(`🚀  Server ready at ${url}`)
    })
  }

  private buildSchema() {
    const schemaLocation = path.join('.', 'graphql', 'root.graphql')
    const typeDefs = importSchema(schemaLocation)
    return typeDefs
  }
}
