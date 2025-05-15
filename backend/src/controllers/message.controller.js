import User from "../models/user.model.js"; //import user model
import Message from "../models/message.model.js"; //import message model
import cloudinary from "../lib/cloudinary.js"; //import configured cloudinary
import { getReceiverSocketId, io } from "../lib/socket.js"; //import socket.io

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; //get user id from request
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password"); //find all users except the logged in user
    res.status(200).json(filteredUsers); //send response
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" }); //send error response
  }
};

export const getMessages = async (req, res) => {
  try {
    const myId = req.user._id; //get user id from request
    const { id: userToChatId } = req.params; //get id from request params
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 }); //find messages between two users and sort by createdAt
    res.status(200).json(messages); //send response
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" }); //send error response
  }
};

export const sendMessages = async (req, res) => {
  try {
    const myId = req.user._id; //get user id from request
    const { id: userToChatId } = req.params; //get id from request params
    const { text, image } = req.body; //get text and image from request body

    let imageUrl;
    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image, {
       
        folder: "chat_app_images", // Use folder instead of upload_preset
      }); //upload image to cloudinary
      imageUrl = uploadedResponse.secure_url; //get image url from response
    } else {
      imageUrl = ""; //if image is not present, set imageUrl to empty string
    }
    const newMessage = await Message.create({
      senderId: myId,
      receiverId: userToChatId,
      text,
      image: imageUrl,  
    }); //create new message
    await newMessage.save(); //save new message
    //realtime functionality goes here => socket.io 
      const receiverSocketId = getReceiverSocketId(userToChatId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json(newMessage); //send response
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error1" }); //send error response
  }
}