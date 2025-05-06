import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRouter = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; //get token from cookie
    if (!token) {
      return res.status(401).json({ message: "Unauthorized-no-token" }); //if token not found
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify token
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized-invalid-token" }); //if token is invalid or expired
    }
    req.user = await User.findById(decoded.userId).select("-password"); //find user by id
    if (!req.user) {
      return res.status(401).json({ message: "User Not Found" }); //if user not found
    }
    next(); //call next middleware
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" }); //if token is invalid or expired
  }
};
