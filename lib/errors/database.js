class DatabaseConnectionError extends Error {
  constructor(message) {
    this.message = message
    this.name = this.constructor.name
  }
}

class UnexpectedDatabaseError extends Error {
  constructor(message) {
    this.message = message
    this.name = this.constructor.name
  }
}

module.exports = {
  DatabaseConnectionError,
  UnexpectedDatabaseError
}
