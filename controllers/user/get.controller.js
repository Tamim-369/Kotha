import User from "../../models/user.model.js";

export async function getUsersController(req, res) {
  try {
    const loggededInUserId = req.user._id;
    if (!loggededInUserId) {
      return res.status(401).json({ message: "You are not authorized" });
    }
    const allUsers = await User.find({ _id: { $ne: loggededInUserId } }).select(
      "-password"
    );
    return res.status(200).json({ allUsers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
