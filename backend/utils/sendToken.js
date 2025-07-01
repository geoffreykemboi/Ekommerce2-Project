// create token and return it in the response body (no cookie)
export default (user, statusCode, res) => {
    const token = user.getJWTToken(); // Generate JWT token

    res.status(statusCode).json({
        success: true,
        token,
        user
    });
};