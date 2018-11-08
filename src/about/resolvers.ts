import About from '.'
import { IResolvers } from 'graphql-tools'

export function aboutResolvers(): IResolvers {
  return {
    About: {
      name(parent: About, args: any, context: any, info: any) {
        console.log('resolvers.About.name')
        return parent.name
      },
      version(parent: About, args: any, context: any, info: any) {
        console.log('resolvers.About.version')
        return parent.version
      },
      url(parent: About, args: any, context: any, info: any) {
        console.log('resolvers.About.url')
        return JSON.stringify(context)
      }
    }
  }
}
