import { Options } from './options'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-fetch'
import gql from 'graphql-tag'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'

export class ArchivistClient {

  public uri = ""
  public client: ApolloClient<NormalizedCacheObject>

  constructor({ uri: string }: Options) {
    Object.assign(this, { uri: string })
    const httpLink = createHttpLink({
      uri: this.uri,
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

  public async blocks(keys: string[]): Promise<any> {
    const result: any = await this.client.query({
      query: gql`
        query BlocksByPublicKey($publicKeys: [String!]) {
          blocksByPublicKey(publicKeys: $publicKeys) {
            publicKey
            blocks {
              hash
              bytes
              major
              minor
              publicKeys {
                hash
                bytes
                major
                minor
                array {
                  hash
                  bytes
                  major
                  minor
                }
              }
              signatures {
                hash
                bytes
                major
                minor
                array {
                  hash
                  bytes
                  major
                  minor
                }
              }
              payloads {
                hash
                bytes
                major
                minor
                signedPayload {
                  hash
                  bytes
                  major
                  minor
                }
                unsignedPayload {
                  hash
                  bytes
                  major
                  minor
                }
              }
              signedBytes
            }
          }
        }
      `,
      variables: {
        publicKeys: keys
      }
    })

    // return the array of chains that we found
    return result.data.blocksByPublicKey
  }

  public async keys(keys: string[]): Promise<any> {
    const result = await this.client.query({
      query: gql`
        query BlocksByPublicKey($publicKeys: [String!]) {
          blocksByPublicKey(publicKeys: $publicKeys) {
            publicKey
            blocks {
              publicKeys {
                array {
                  bytes
                }
              }
            }
          }
        }
      `,
      variables: {
        publicKeys: keys
      }
    })

    return result.data
  }

  public async blockHashes(keys: string[]): Promise<any> {
    const result: any = await this.client.query({
      query: gql`
        query BlocksByPublicKey($publicKeys: [String!]) {
          blocksByPublicKey(publicKeys: $publicKeys) {
            publicKey
            blocks {
              hash
            }
          }
        }
      `,
      variables: {
        publicKeys: keys
      }
    })

    const hashes: string[] = []

    result.data.blocksByPublicKey.forEach((chain: any) => {
      chain.blocks.forEach((block: any) => {
        hashes.push(block.hash)
      })
    })

    return hashes
  }

}
