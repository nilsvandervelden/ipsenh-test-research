/**
 * Thrown when user could not be found
 */
export class NoUsersFoundException extends Error {
  constructor(message: string) {
    super(message);
  }
}
