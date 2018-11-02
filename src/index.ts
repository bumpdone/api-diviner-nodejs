import { ApolloServer, gql, Config, CorsOptions } from 'apollo-server'
import { IResolvers } from 'graphql-tools'
import listResolvers from './list/resolvers'
import listMetaResolvers from './list/meta/resolvers'
import blockResolvers from './scsc/block/resolvers'
import { importSchema } from 'graphql-import'
import Block from './scsc/block'
import { IntersectionList } from './list/intersection'
import { IntersectionQuestion, Direction } from './question/intersection'
import { ArchivistList } from './list/archivist'
import path from 'path'
import { merge } from 'lodash'
import { inspect } from 'util'
import About from './about'
import { createNode } from 'ipfs'
import program from 'commander'
import { ArchivistClient } from './client/archivist'
import pkginfo from 'pkginfo'

export class DivinerApi {

  public server: ApolloServer
  public ipfs: any
  public archivists: string[] = []

  public resolverArray = [
    {
      Query: {
        async about(parent: any, args: any, context: any, info: any) {
          console.log(`resolvers.Query.about`)
          return new About({
            name: "Diviner",
            version:module.exports.version,
            url:`http:${context.req.headers.host}`,
            address:context.address,
            seeds: context.seeds
          })
        },
        async block(parent: any, args: any, context: any, info: any) {
          console.log(`resolvers.Query.block: ${args.hash}`)
          return new Block({ hash: args.hash, data: {}, ipfs: context.ipfs })
        },
        async intersections(addresses: [string]) {
          return new IntersectionList(["0x00", "0x11"])
        },
        async archivists(parent: any, args: any, context: any, info: any): Promise<any> {
          return new ArchivistList(context.archivists)
        },
        async questionHasIntersected(parent: any, args: any, context: any, info: any): Promise<any> {
          let direction: Direction
          switch (args.direction) {
            case "FORWARD":
              direction = Direction.Forward
              break
            case "BACKWARD":
              direction = Direction.Backward
              break
            default:
              direction = Direction.Both
              break
          }
          const q = new IntersectionQuestion(
            args.partyOneAddresses,
            args.partyTwoAddresses,
            args.markers,
            direction,
            [new ArchivistClient({ uri:context.archivists[0] })]
            )
          return q.process()
        }
      }
    },
    listResolvers(),
    listMetaResolvers(),
    blockResolvers()
  ]

  public resolvers: IResolvers
  public seeds: { archivists: string[], diviners: string[] }
  public address = "0123456789"

  constructor(options: { seeds: { archivists: string[], diviners: string[] } }) {
    this.seeds = options.seeds
    this.resolvers =  merge(this.resolverArray)
    const typeDefs = gql(this.buildSchema())

    this.seeds.archivists.forEach((archivist) => {
      this.archivists.push(archivist)
    })

    const context = ({ req }: {req: any}) => ({
      ipfs: this.ipfs,
      req,
      address: this.address,
      archivists: this.archivists,
      seeds: this.seeds
    })

    const config: Config & { cors?: CorsOptions | boolean } = {
      typeDefs,
      resolvers: this.resolvers,
      context
    }

    this.server = new ApolloServer(config)
  }

  public start(port: number = 12002) {

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
      console.log(`XYO Diviner [${module.exports.version}] ready at ${url}`)
    })
  }

  private buildSchema() {
    const schemaLocation = path.normalize(`${__dirname}/../graphql/root.graphql`)
    const typeDefs = importSchema(schemaLocation)
    return typeDefs
  }
}

pkginfo(module)

program
  .version(module.exports.version)
  .option('-p, --port [n]', 'The Tcp port to listen on for connections (not yet implemented)', parseInt)
  .option('-g, --graphql [n]', 'The http port to listen on for graphql connections (default=12002)', parseInt)
  .option('-a, --archivist [s]', 'The url of the seed archivist to contact (default=http://archivists.xyo.network:11001/)')

program
  .command('start')
  .description('Start the Diviner')
  .action(() => {
    const xyo = new DivinerApi({ seeds: { archivists: [(program.archivist || "http://archivists.xyo.network:11001/")], diviners: [] } })
    xyo.start(program.graphql || 12002)
  })

program.parse(process.argv)

if (process.argv.length < 3) {
  program.help()
}
