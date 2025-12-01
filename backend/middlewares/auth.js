import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // Ensure header exists and follows "Bearer <token>"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access Denied. No token found." });
    }

    const token = authHeader.split(" ")[1]; // <-- fixed .split typo

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    // Optionally log error in dev: console.error(error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
