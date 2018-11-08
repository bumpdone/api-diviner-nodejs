/* eslint-disable */
import HDWalletProvider from 'truffle-hdwallet-provider'
import dotenv from 'dotenv'
import Web3 from 'web3'
import { downloadFiles } from './IPFSReader'
import { Provider } from 'web3/providers'

dotenv.config()

let web3: any

const mnemonic = process.env.MNENOMIC
const infuraKey = process.env.INFURA_API_KEY
let currentUser = process.env.WALLET

let currentNetwork: any
let smartContracts: any

const getCurrentNetwork = () => {
  return currentNetwork
}

const getSmartContracts = () => smartContracts

const getCurrentConfigStore = () =>
  web3
    ? web3.currentProvider
      ? web3.currentProvider.publicConfigStore
      : undefined
    : undefined

const getNetworksString = (networks: any) => {
  let networkString = ''
  let iterator = 0
  Object.entries(networks).forEach((net: any) => {
    networkString += getNetworkString(iterator, net[0])
    iterator++
  })
  return networkString
}

const getNetworkString = (iterator: any , netId: any) => {
  const addComma = (iterator2: any, word2: any) => (iterator2 > 0 ? `, ${word2}` : word2)
  let word = 'localhost'
  switch (netId) {
    case '1':
      word = 'mainnet'
      break
    case '3':
      word = 'roptsten'
      break
    case '4':
      word = 'rinkeby'
      break
    case '42':
      word = 'kovan'
      break
    case '5777':
      word = 'localhost'
      break
  }
  return addComma(iterator, word)
}

const contractObject = (name: any) => smartContracts.find((contract: any) => contract.name === name)

export const contractNamed = (name: any) => {
  const contractObj = contractObject(name)
  return contractObj ? contractObj.contract : undefined
}

const contractAddress = (name: any) => {
  const contractObj = contractObject(name)
  return contractObj ? contractObj.address : undefined
}

export const validateContracts = async () => {
  return Promise.all(
    smartContracts.map((contract: any) => validContract(contract.name)),
  ).then((results: any) => {
    if (results.length === 0) {
      throw new Error('No contracts found on this network')
    } else {
      return results.reduce((result: any, next: any) => result && next)
    }
  })
}

const validContract = async (name: any) => {
  const address = contractAddress(name)
  return new Promise((resolve, reject) => {
    web3.eth
      .getCode(address)
      .then((code: any) =>
        code === '0x0' || code === '0x' ? resolve(false) : resolve(true),
      )
      .catch((err: any) => reject(err))
  })
}

const getCurrentUser = () => currentUser

export const refreshContracts = async (netId: any, ipfsHash: any) => {
  console.log('Refreshing contracts')
  return downloadFiles(ipfsHash)
    .then((contracts: any) => {
      currentNetwork = getNetworkString(0, String(netId))
      const sc: any = []
      contracts.forEach((contract: any) => {
        const json = contract.data
        if (json && json.networks[netId]) {
          console.log(
            'Adding Contract',
            json.contractName,
            json.networks[netId],
          )
          const address = json.networks[netId].address
          const contract2 = new web3.eth.Contract(json.abi, address)
          sc.push({
            name: json.contractName,
            contract2,
            address,
            networks: json.networks,
          })
        } else if (Object.entries(json.networks).length > 0) {
          console.log(
            'You are on the wrong network',
            web3.currentProvider.network,
            Object.entries(json.networks)[0],
          )
          throw new Error('Wrong Network Detected')
        }
      })
      smartContracts = sc
      return sc
    })
    .catch((err: any) => {
      console.log('Caught here', err)
      // throw new Error('Could not refresh', err)
    })
}

const getWeb3 = (netId: any) => {
  if (netId !== '5777') {
    return new Web3(
      new HDWalletProvider(
        mnemonic,
        `https://${getNetworksString(netId)}.infura.io/v3/${infuraKey}`,
      ) as Provider,
    )
  }
  const provider = new HDWalletProvider(mnemonic, 'http://localhost:8545')
  return new Web3(provider as Provider)
}

const refreshUser = async () =>
  web3.eth.getAccounts().then((accounts: any) => {
    console.log(`Updating USER from ${currentUser} to ${accounts[0]}`)
    currentUser = accounts[0]
    return accounts[0]
  })

// reloadWeb3 = async (netId, ipfsHash) => {
//   web3 = getWeb3(netId)
//   return refreshContracts(netId, ipfsHash)
// }

export const reloadWeb3 = (network: any, ipfsHash: any) => {
  web3 = getWeb3(network)

  const refreshDapp = async () =>
    Promise.all([refreshUser(), refreshContracts(network, ipfsHash)])

  return refreshDapp()
}

module.exports = {
  refreshContracts,
  reloadWeb3,
  validateContracts,
  contractNamed,
}
