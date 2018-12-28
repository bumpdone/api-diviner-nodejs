/*
 * @Author: XY | The Findables Company <ryanxyo>
 * @Date:   Wednesday, 19th December 2018 4:41:14 pm
 * @Email:  developer@xyfindables.com
 * @Filename: index.ts
 * @Last modified by: ryanxyo
 * @Last modified time: Wednesday, 19th December 2018 5:22:59 pm
 * @License: All Rights Reserved
 * @Copyright: Copyright XY | The Findables Company
 */

import { XyoBase } from '@xyo-network/base'
import { IXyoMetaList } from '@xyo-network/meta-list'
import { IXyoDivinerArchivistClient } from '@xyo-network/diviner-archivist-client'
import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'cross-fetch'

export class XyoDivinerArchivistGraphQLClient extends XyoBase implements IXyoDivinerArchivistClient {

  private static intersectionsQuery = gql`
    query Intersections($publicKeyA: String!, $publicKeyB: String!, $limit: Int!, $cursor: String) {
      intersections(publicKeyA: $publicKeyA, publicKeyB: $publicKeyB, limit: $limit, cursor: $cursor) {
        meta {
          totalCount,
          endCursor,
          hasNextPage
        },
        items
      }
    }
  `

  private readonly client: ApolloClient<any>

  constructor (private readonly archivistUrl: string) {
    super()
    const httpLink = createHttpLink({
      uri: this.archivistUrl,
      fetch,
      fetchOptions: {
        timeout: 10000
      }
    })

    this.client = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache()
    })
  }

  public async getIntersections(
    publicKeyA: string,
    publicKeyB: string,
    limit: number,
    cursor: string | undefined
  ): Promise<IXyoMetaList<string>>  {
    try {
      this.logInfo(`Getting intersections of ${publicKeyA} and ${publicKeyB}`)
      const result = await this.client.query<{intersections: IXyoMetaList<string>}>({
        query: XyoDivinerArchivistGraphQLClient.intersectionsQuery,
        variables: {
          publicKeyA,
          publicKeyB,
          limit,
          cursor
        }
      })

      return result.data.intersections
    } catch (ex) {
      this.logError('There was an error getting intersections from archivist client', ex)
      throw ex
    }
  }

}
