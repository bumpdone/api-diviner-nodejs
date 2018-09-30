import { Block } from "../block"
import { IResolvers } from "graphql-tools"

export function blockResolvers(): IResolvers {
  return {
    Block: {
      hash(parent: Block, args: any, context: any, info: any) {
        console.log("resolvers.Block.hash")
        return parent.hash
      }
    }
  }
}
