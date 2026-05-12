import type { ErrorCode } from '../types/error'

export default class AppError extends Error {
  code: ErrorCode

  constructor(message: string, code: ErrorCode) {
    super(message)

    this.name = 'AppError'
    this.code = code
  }
}
