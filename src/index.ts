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

export class XyoApi {

  public resolvers: IResolvers =  merge([
    {
      Query: {
        async about() {
          console.log(`resolvers.Query.about`)
          return new About("Diviner", "0.1.0")
        },
        async block(parent: any, args: any, context: any, info: any) {
          console.log(`resolvers.Query.block: ${args.hash}`)
          if (!args.hash) {
            return new Block("0x0000", "0x0000")
          }
          return new Block(args.hash, "0x0001")
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

  public server: ApolloServer

  constructor() {
    const typeDefs = gql(this.buildSchema())

    const context = ({ req }: {req: any}) => ({
    })

    const config: Config & { cors?: CorsOptions | boolean } = {
      typeDefs,
      resolvers: this.resolvers,
      context
    }

    this.server = new ApolloServer(config)
  }

  public start() {
    this.server.listen().then(({ url }: {url: any}) => {
      console.log(`🚀  Server ready at ${url}`)
    })
  }

  private buildSchema() {
    const schemaLocation = path.join('.', 'graphql', 'root.graphql')
    const typeDefs = importSchema(schemaLocation)
    return typeDefs
  }
}
