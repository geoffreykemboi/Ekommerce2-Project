export default (controllerFunction) => (req, res, next) => {
    Promise.resolve(controllerFunction(req, res, next)).catch((error) => {
        // Log the error for debugging purposes
        console.error("Error in controller:", error);
    
        // Pass the error to the next middleware (error handler)
        next(error);
        });
    }
