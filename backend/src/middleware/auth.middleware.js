import jsonwebtoken from "jsonwebtoken";
import User from "../models/user.model.js";
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookie.jwt;
    if (!token) {
      return res.status(400).json({
        message: "No token !",
      });
    }
    const decodedToken = jsonwebtoken.verify(token, process.env.SECRET_KEY);

    if (!decodedToken) {
      return res.status(400).json({
        message: " Token invalid",
      });
    }
    const user = await User.findById(decodedToken.userId).select("-password");

    if (!user) {
      return res.status(400).json({
        message: "No user",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("error in protect routes middleware", error);
  }
};
