const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    let token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Access denied, no token provided" });
    }

    // Ensure token is in "Bearer <token>" format
    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length); // Remove "Bearer " prefix
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
