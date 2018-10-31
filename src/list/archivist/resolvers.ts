import { IResolvers } from "graphql-tools"
import { ArchivistList } from "."
import { Intersection } from "../../intersection"

export function archivistListResolvers(): IResolvers {
  return {
    AddressList: {
      meta(parent: ArchivistList, args: any, context: any, info: any) {
        console.log("resolvers.ArchivistList.meta")
        return parent.meta
      },
      items(parent: ArchivistList, args: any, context: any, info: any) {
        console.log(`resolvers.ArchivistList.items`)
        return parent.items
      }
    }
  }
}
