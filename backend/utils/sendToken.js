// create token and save it in a cookie
export default (user, statusCode, res) => {
    const token = user.getJWTToken(); // Generate JWT token

    // Options for the cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000 // Convert days to milliseconds
        ),
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        sameSite: "none", // Required for cross-site cookies
        secure: true      // Required for cross-site cookies (HTTPS)
    };

    console.log(options); // Log the generated token for debugging

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,        
    });
};