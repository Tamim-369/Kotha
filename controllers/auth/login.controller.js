import User from "../../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../../utils/generateToken.js";
export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const isPasswordMatch = await bcryptjs.compare(
      password,
      user?.password || ""
    );
    if (!user) {
      return res.status(400).json({ message: "Invalid Username" });
    } else if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    await generateTokenAndSetCookie(user._id, res);
    return res.status(200).json({
      message: "Login Successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        gender: user.gender,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something Went Wrong." });
  }
};
