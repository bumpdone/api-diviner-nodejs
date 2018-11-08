import Meta from '.'
import { IResolvers } from 'graphql-tools'

export default function listMetaResolvers(): IResolvers {
  return {
    ListMeta: {
      totalCount(parent: Meta, args: any, context: any, info: any) {
        console.log('resolvers.ListMeta.totalCount')
        return parent.totalCount
      },
      endCursor(parent: Meta, args: any, context: any, info: any) {
        return parent.endCursor
      },
      hasNextPage(parent: Meta, args: any, context: any, info: any) {
        return parent.hasNextPage
      }
    }
  }
}
