import { ApolloServer, gql, Config, CorsOptions } from 'apollo-server'
import { IResolvers } from 'graphql-tools'
import listResolvers from './list/resolvers'
import listMetaResolvers from './list/meta/resolvers'
import blockResolvers from './scsc/block/resolvers'
import { importSchema } from 'graphql-import'
import Block from './scsc/block'
import { IntersectionList } from './list/intersection'
import { IntersectionQuestion } from './question/intersection'
import path from 'path'
import { merge } from 'lodash'
import { inspect } from 'util'
import About from './about'
import { createNode } from 'ipfs'
import program from 'commander'

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
          return new Block({ hash: args.hash, data: {}, ipfs: context.ipfs })
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

program
  .version('0.1.0')
  .option('-p, --port [n]', 'The Tcp port to listen on for connections (not yet implemented)', parseInt)
  .option('-g, --graphql [n]', 'The http port to listen on for graphql connections', parseInt)
  .option('-a, --archivist [s]', 'The url of the seed archivist to contact')
  .parse(process.argv)

program
  .command('start')
  .description('Start the Diviner')
  .action(() => {
    const xyo = new DivinerApi(program.archivist || "http://localhost:11001")
    xyo.start(program.host || "localhost", program.graphql || 12001)
  })

program.parse(process.argv)

if (process.argv.length < 3) {
  program.help()
}
