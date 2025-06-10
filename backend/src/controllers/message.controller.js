import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUsersforSidebar = async (req, res) => {
  try {
    const loggedInId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInId } }).select(
      "-password"
    );
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in get users for sidebar", error);
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: receiverUserId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [{ senderId: myId, receiverId: receiverUserId }],
      $or: [{ senderId: receiverUserId, receiverId: myId }],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in get all messages", error);
  }
};
