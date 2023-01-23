import IDBError from './interface.js'

export class ErrorHTTPInvalidRequest extends IDBError {
  constructor(message) {
    super(message)
  }
}

export class ErrorHTTPUnauthorizedRequest extends IDBError {
  constructor(message) {
    super(message)
  }
}
