/**
 * Thrown when a user submits a wrong password when editing theire password
 */
export class WrongPasswordException extends Error {
  constructor(message: string) {
    super(message);
  }
}
