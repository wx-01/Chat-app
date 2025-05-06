import cloudinary from "../lib/cloudinary.js";
import { generateAuthToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!email || !fullName || !password) {
      //all fields must exist
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    if (password.length < 6) {
      //password should be greater then six characters
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const user = await User.findOne({ email }); //check if user already exists
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10); //generate salt for hashing password
    const hashedPassword = await bcrypt.hash(password, salt); //hash password
    const newUser = new User({
      //create new user
      email,
      fullName,
      password: hashedPassword,
      /* profilePic: req.file.path, // store image path in database  */
    });
    if (newUser) {
      // generate jwt token and send it to the user
      generateAuthToken(newUser._id, res); //generate token and set cookie in browser
      await newUser.save(); //save user in database
      //return response with status code 201 and message "User created successfully"
      res.status(201).json({
        message: "User created successfully",
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      }); //send response to the user
    } else {
      return res.status(400).json({ message: "User not created" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" }); //if any error occurs
  }
};
export const login = (req, res) => {
  try {
    const { email, password } = req.body; //get email and password from request body
    if (!email || !password) {
      //all fields must exist
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    User.findOne({ email })
      .then(async (user) => {
        //check if user exists
        if (!user) {
          return res.status(400).json({ message: "User not found" }); //if user not found
        }
        const isMatch = await bcrypt.compare(password, user.password); //compare password with hashed password
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" }); //if password does not match
        }
        generateAuthToken(user._id, res); //generate token and set cookie in browser
        return res.status(200).json({
          message: "Login successful",
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          profilePic: user.profilePic,
        }); //send response to the user
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" }); //if any error occurs
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" }); //if any error occurs
  }
};
export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", "", { maxAge: 0 }); //clear cookie from browser
    return res.status(200).json({ message: "Logout successful" }); //send response to the user
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" }); //if any error occurs
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body; //get profilePic from request body
    const userId = req.user._id; //get user id from request
    if (!profilePic) {
      //all fields must exist
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    await cloudinary.uploader
      .upload(profilePic, {
        //upload image to cloudinary
        folder: "profilePic", //folder name in cloudinary
      })
      .then(async (result) => {
        //if image uploaded successfully
        const user = await User.findByIdAndUpdate(
          userId,
          {
            //update user profilePic in database
            profilePic: result.secure_url, //get image url from cloudinary
          },
          { new: true }
        ); //return updated user
        return res.status(200).json({
          message: "Profile updated successfully",
          user, //return updated user
        }); //send response to the user
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" }); //if any error occurs
      });
  } catch (error) {}
};
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user); //send response to the user
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" }); //if any error occurs
  }
};
