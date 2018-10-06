import { IResolvers } from "graphql-tools"
import { IntersectionList } from "."
import { Intersection } from "../../intersection"

export function interseectionListResolvers(): IResolvers {
  return {
    AddressList: {
      meta(parent: IntersectionList, args: any, context: any, info: any) {
        console.log("resolvers.IntersectionList.meta")
        return parent.meta
      },
      items(parent: IntersectionList, args: any, context: any, info: any) {
        console.log(`resolvers.IntersectionList.items`)
        return parent.items
      }
    }
  }
}
