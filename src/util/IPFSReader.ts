import ipfsAPI from 'ipfs-api'

const ipfs = new ipfsAPI({
  host: 'ipfs.xyo.network',
  port: 5002,
  protocol: 'https',
})

export const downloadFiles = (ipfsHash: any) => {
  return new Promise((resolve, reject) => {
    const abi: any = []
    ipfs.get(ipfsHash, (err: any, files: any) => {
      if (err) {
        reject(err)
        return
      }
      try {
        files.forEach((file: any) => {
          if (file.content) {
            abi.push({ data: JSON.parse(String(file.content)) })
          }
        })
      } catch (err) {
        reject(err)
        return
      }

      resolve(abi)
    })
  })
}
