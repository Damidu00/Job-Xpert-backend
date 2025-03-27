import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        // Extract the token from cookies
        const token = req.cookies.token;
    console.log(token);
    
        // Check if the token exists
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated.",
                success: false,
            });
        }

        // Verify the token (wrap jwt.verify in a Promise)
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    reject(err); // Reject if verification fails
                } else {
                    resolve(decoded); // Resolve with the decoded payload
                }
            });
        });

        // Attach the decoded user ID to the request object
        req.id = decoded.user_id;
         
        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        console.error("JWT Verification Error:", error.message);

        // Handle specific JWT errors
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token has expired.",
                success: false,
            });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Invalid token.",
                success: false,
            });
        }

        // Generic server error
        return res.status(500).json({
            message: "An unexpected error occurred.",
            success: false,
        });
    }
};

export default isAuthenticated;