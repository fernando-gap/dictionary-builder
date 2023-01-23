export default class IDBError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.name = this.constructor.name
  }
}

