import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "myNameIsAhmed", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token", err });
    }

    req.user = decoded;
    next();
  });
};
