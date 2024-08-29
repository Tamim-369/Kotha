import Conversation from "../../models/conversations.model.js";

export async function getMessagesController(req, res) {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");
    const messages = conversation?.messages;
    if (!messages || messages.length === 0) {
      return res.status(404).json({ message: "No messages found" });
    }
    return res.status(200).json({ messages });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
