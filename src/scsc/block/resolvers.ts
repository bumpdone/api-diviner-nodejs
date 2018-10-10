import Block from "."
import { IResolvers } from "graphql-tools"

export default function blockResolvers(): IResolvers {
  return {
    Block: {
      hash(parent: Block, args: any, context: any, info: any) {
        console.log("resolvers.Block.hash")
        return parent.hash
      }
    }
  }
}
