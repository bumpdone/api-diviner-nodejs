import { IResolvers } from 'graphql-tools'
import { ScscInfo } from '.'

export default function scscInfoResolvers(): IResolvers {
  return {
    SCSCInfo: {
      async abi(parent: ScscInfo, args: any, context: any, info: any) {
        console.log('resolvers.ScscInfo.abi')
        const abi = await parent.getABI()
        return JSON.stringify(abi)
      },
      async bytecode(parent: ScscInfo, args: any, context: any, info: any) {
        console.log('resolvers.ScscInfo.abi')
        const bytecode = await parent.getBytecode()
        return bytecode
      }
    }
  }
}
