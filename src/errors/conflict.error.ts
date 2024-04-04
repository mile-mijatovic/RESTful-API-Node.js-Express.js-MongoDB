import { HttpStatusCode } from '../types/enums';
import { ApiError } from './api.error';

export class ConflictError extends ApiError {
  constructor(message = '') {
    super(message, HttpStatusCode.CONFLICT);
    this.name = 'ConflictError';
  }
}
