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
import { ArchivistClient } from './client/archivist'
import { version } from 'pkginfo'

export class DivinerApi {

  public server: ApolloServer
  public ipfs: any
  public archivists: string[] = []

  public resolvers: IResolvers =  merge([
    {
      Query: {
        async about(parent: any, args: any, context: any, info: any) {
          console.log(`resolvers.Query.about`)
          return new About("Diviner", version, `http://${context.req.headers.host}`, context.address)
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
          const q = new IntersectionQuestion(
            args.partyOneAddresses,
            args.partyTwoAddresses,
            args.direction,
            [new ArchivistClient({ uri:context.archivists[0] })]
            )
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
      ipfs: this.ipfs,
      req,
      address: "0x000",
      archivists: this.archivists
    })

    const config: Config & { cors?: CorsOptions | boolean } = {
      typeDefs,
      resolvers: this.resolvers,
      context
    }

    this.server = new ApolloServer(config)
  }

  public start(host: string = 'localhost', port: number = 11001) {

    console.log(" --- START ---")

    this.ipfs = createNode({ port: 1111 })

    this.ipfs.on('ready', () => {
      console.log('Ipfs is ready to use!')
    })

    this.ipfs.on('error', (error: any) => {
      console.log('Something went terribly wrong!', error)
    })

    this.ipfs.on('start', () => console.log('Ipfs started!'))

    this.server.listen({ port }).then(({ url }: {url: any}) => {
      console.log(`XYO Diviner [${version}] ready at ${url}`)
    })
  }

  private buildSchema() {
    const schemaLocation = path.normalize(`${__dirname}/../graphql/root.graphql`)
    const typeDefs = importSchema(schemaLocation)
    return typeDefs
  }
}

program
  .version(version)
  .option('-p, --port [n]', 'The Tcp port to listen on for connections (not yet implemented)', parseInt)
  .option('-g, --graphql [n]', 'The http port to listen on for graphql connections', parseInt)
  .option('-a, --archivist [s]', 'The url of the seed archivist to contact (default=http://localhost:11001)')

program
  .command('start')
  .description('Start the Diviner')
  .action(() => {
    const xyo = new DivinerApi(program.archivist || "http://localhost:11001")
    xyo.start(program.host || "localhost", program.graphql || 12002)
  })

program.parse(process.argv)

if (process.argv.length < 3) {
  program.help()
}
