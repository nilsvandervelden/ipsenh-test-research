/**
 * Thrown when trying to register with an email that has already been registered
 */
export class EmailMustBeUniqueException extends Error {
  constructor(message: string) {
    super(message);
  }
}
