/**
 * Thrown when a user can not be saved
 */
export class CouldNotSaveUserException extends Error {
  constructor(message: string) {
    super(message);
  }
}
