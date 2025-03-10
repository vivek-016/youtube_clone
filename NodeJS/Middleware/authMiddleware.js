import jwt from "jsonwebtoken";

const JWT_SECRET = "secret_key";
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract the token

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET); 
        req.user = decoded; // Attach the decoded token data to the request object
        next(); // Move to the next middleware or route handler
    } catch (err) {
        res.status(403).json({ message: "Invalid token." });
    }
};
