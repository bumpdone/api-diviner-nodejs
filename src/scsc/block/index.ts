import { IPFS } from 'ipfs'
import Options from "./options"
import Data from "./data"
import Header from './header'
import Payment from './payment'

interface Validation { valid: boolean, messages: string[] }

export default class Block {

  public hash?: string
  public bytes?: Buffer
  public ipfs?: IPFS
  public data: Data = {}

  constructor(options: Options) {
    this.ipfs = options.ipfs
    this.hash = options.hash

    if (options.data) {
      this.data = options.data
    }
  }

  public async read() {
    if (this.ipfs) {
      this.ipfs.files.get(this.hash)
    } else {
      throw Error("IPFS needed to read")
    }
  }

  public concatValidation(base: Validation, additional: Validation) {
    base.valid = base.valid && additional.valid
    base.messages.concat(additional.messages)
  }

  public validateHeader(header?: Header): Validation {
    const validation: Validation = { valid: true, messages: [] }

    if (!header) {
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
    const validation: Validation = { valid: true, messages: [] }
    const data = this.data
    if (data) {
      this.concatValidation(validation, this.validateHeader(data.header))
      this.concatValidation(validation, this.validateHashes(data.hashes))
      this.concatValidation(validation, this.validatePayments(data.payments))
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
