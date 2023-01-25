import IDBError from './interface.js'

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

export class ErrorUndefinedCollection extends IDBError {
  constructor(message) {
    super(message)
  }
}