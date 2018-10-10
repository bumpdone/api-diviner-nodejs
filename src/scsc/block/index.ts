import { IPFS } from 'ipfs'
import Options from "./options"
import Data from "./data"
import Header from './header'
import Payment from './payment'

interface Validation { valid: boolean, messages: string[] }

export default class ScscBlock {

  public hash?: string
  public bytes?: Buffer
  public ipfs?: IPFS
  public data?: Data

  constructor(options?: Options) {
    if (options) {
      this.ipfs = options.ipfs
      this.hash = options.hash

      if (options.data) {
        this.data = options.data
      }
    }
  }

  public async read() {
    if (this.ipfs) {
      this.ipfs.files.get(this.hash)
    } else {
      throw Error("IPFS needed to read")
    }
  }

  public concatValidation(v1: Validation, v2: Validation): Validation {
    const v: Validation = { valid: true, messages: [] }
    v.valid = v1.valid && v2.valid
    v.messages.concat(v1.messages)
    v.messages.concat(v2.messages)
    return v
  }

  public isValidAddress(address: string): boolean {
    return address.length === 40
  }

  public validateHeader(header?: Header): Validation {
    const validation: Validation = { valid: true, messages: [] }

    if (header) {
      if (!this.isValidAddress(header.address)) {
        validation.valid = false
        validation.messages.push("Invalid Address in Header")
      }
    } else {
      validation.messages.push("Missing Header")
      validation.valid = false
    }

    return validation
  }

  public validateHashes(hashes?: string[]): Validation {
    const validation: Validation = { valid: true, messages: [] }

    if (!hashes) {
      validation.messages.push("Missing Hashes")
      validation.valid = false
    }

    return validation
  }

  public validatePayments(payments?: Payment[]): Validation {
    const validation: Validation = { valid: true, messages: [] }

    if (!payments) {
      validation.messages.push("Missing Payments")
      validation.valid = false
    }

    return validation
  }

  public validate(): Validation {
    let validation: Validation = { valid: true, messages: [] }
    const data = this.data
    if (data) {
      validation = this.concatValidation(validation, this.validateHeader(data.header))
      validation = this.concatValidation(validation, this.validateHashes(data.hashes))
      validation = this.concatValidation(validation, this.validatePayments(data.payments))
    } else {
      validation.messages.push("Missing Data")
      validation.valid = false
    }
    return validation
  }

  public async write() {
    if (this.ipfs) {
      const validation = this.validate()
      if (validation.valid) {
        this.hash = this.ipfs.files.put(this.data)
      } else {
        throw Error("Write Failed. Invalid Data")
      }
    } else {
      throw Error("IPFS needed to write")
    }
  }

}
