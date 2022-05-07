export class AppError extends Error {
  constructor(public statusCode: number, public codeString: string, message: string) {
    super(message);

    Error.captureStackTrace(this);
  }
}
