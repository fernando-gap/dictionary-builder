class IDBError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.name = this.constructor.name
  }
}

export class DatabaseConnectionError extends IDBError {
  constructor(message) {
    super(message)
  }
}

export class UnexpectedDatabaseError extends IDBError {
  constructor(message) {
    super(message)
  }
}

export class DatabaseURLNotSet extends IDBError {
  constructor(message) {
    super(message)
  }
}

