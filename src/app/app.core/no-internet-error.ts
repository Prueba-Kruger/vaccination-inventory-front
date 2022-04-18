export class NoInternetError extends Error {

    httpStatus ? = 500;
    applicationStatus ?: number;
    errorMessageTranslationkey: string;
    handled = false;

    constructor(message?: string) {
      super(message);
      this.name = NoInternetError.name;
      Object.setPrototypeOf(this, NoInternetError.prototype);
    }
  }

