import { inspect } from 'util'

export default class Meta {
  public totalCount = 0
  public endCursor: string | null = null
  public hasNextPage = false
}
