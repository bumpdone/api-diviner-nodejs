import { inspect } from 'util'

export class ListMeta {
  public totalCount?: number
  public endCursor?: string
  public hasNextPage?: boolean
}
