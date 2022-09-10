/**
 * Thrown when a user could not be deleted
 */
export class CouldNotDeleteUserException extends Error {
  constructor(message: string) {
    super(message);
  }
}
