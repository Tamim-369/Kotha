import mongoose from "mongoose"; // Import mongoose
import Conversation from "../../models/conversations.model.js";
import Message from "../../models/message.model.js";
import { getRecieverSocketID, io } from "../../socket/socket.js";
export async function sendMessageController(req, res) {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: "Message cannot be empty" });
    }
    const receiverId = new mongoose.Types.ObjectId(req.params.id); // Use 'new' keyword
    const senderId = new mongoose.Types.ObjectId(req.user._id); // Use 'new' keyword

    let conversation = await Conversation.findOneAndUpdate(
      {
        participants: { $all: [senderId, receiverId] },
      },
      { new: true }
    );

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    Promise.all([newMessage.save(), conversation.save()]);
    const recieverSocketId = getRecieverSocketID(receiverId);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }
    return res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something Went Wrong." });
  }
}
