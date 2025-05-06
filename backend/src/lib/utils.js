import jwt from "jsonwebtoken";

export const generateAuthToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });//generate token

res.cookie("jwt", token, {
          //set cookie in browser
          httpOnly: true, //cookie is not accessible from javascript ,prevents XSS attacks
          secure: process.env.NODE_ENV !== "development", //cookie is only sent over http or https
          sameSite: "strict", //cookie is only sent to same site, prevents CSRF attacks
          maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expires in 7 day
        });
      return token;
}; 

