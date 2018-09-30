import { ListMeta } from "../lists/listmeta"
import { IResolvers } from "graphql-tools"

export function listMetaResolvers(): IResolvers {
  return {
    ListMeta: {
      totalCount(parent: ListMeta, args: any, context: any, info: any) {
        console.log("resolvers.ListMeta.totalCount")
        return parent.totalCount
      },
      endCursor(parent: ListMeta, args: any, context: any, info: any) {
        return parent.endCursor
      },
      hasNextPage(parent: ListMeta, args: any, context: any, info: any) {
        return parent.hasNextPage
      }
    }
  }
}
