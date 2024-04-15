import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  userId: string;
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get token from header
  const authToken = req.headers.authorization;

  // bearer token
  // check if token exists
  if (!authToken || !authToken.startsWith("Bearer")) {
    return res.status(401).json({
      success: false,
      message: "No token found, authorization denied",
    });
  }

  try {
    const token = authToken.split(" ")[1];
    // verify token
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );
    (req as AuthRequest).userId = decoded.id;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token Expired, authorization denied",
      });
    }
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
