class CustomError extends Error {
  constructor(code = 0, message, type) {
    super(message);
    this.code = code;
    this.type = type || 'CustomError'; // Setting the name of the error (optional)
  }
}

module.exports = CustomError;
