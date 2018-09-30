import { IResolvers } from "graphql-tools"

export function listResolvers(): IResolvers {
  return {
    List: {
      __resolveType(parent: any, args: any, context: any, info: any) {
        console.log("resolvers.List.type")
        return context.listItemType
      }
    }
  }
}
