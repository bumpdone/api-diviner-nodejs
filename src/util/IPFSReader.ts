import ipfsAPI from 'ipfs-api'

const ipfs = new ipfsAPI({
  host: 'ipfs.xyo.network',
  port: 5002,
  protocol: 'https',
})

const getIpfsAsync = async(hash: string) : Promise<any> => {
  return new Promise((resolve, reject) => {
    ipfs.get(hash, (err: any, files: any) => {
      if (err) {
        reject(err)
      } else {
        resolve(files)
      }
    })
  })
}

export const downloadFilesFromIpfs = async (ipfsHash: any): Promise<any[]> => {
  console.log('downloadFilesFromIpfs: ', ipfsHash)
  const abi: any[] = []
  const files = await getIpfsAsync(ipfsHash)

  files.forEach((file: any) => {
    if (file.content) {
      abi.push({ data: JSON.parse(String(file.content)) })
    }
  })

  return abi
}
