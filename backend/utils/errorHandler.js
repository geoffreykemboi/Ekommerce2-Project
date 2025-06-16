
class ErrorHandler extends Error {      // Inherits from the built-in Error class
  constructor(message, statusCode) {    // Constructor function to initialize the class
    super(message);                     // Calls the constructor of the parent class Error
    this.statusCode = statusCode;
    this.isOperational = true; // Indicates that this error is expected and can be handled
    
    // Create a stack trace for the error (optional)
    Error.captureStackTrace(this, this.constructor); // Captures stack trace for debugging purposes
  }
}

export default ErrorHandler;
