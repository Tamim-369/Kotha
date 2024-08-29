import User from "../../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../../utils/generateToken.js";
export const signUpController = async (req, res) => {
  try {
    const { fullname, username, gender, password } = req.body;

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    } else {
      const hashedPassword = await bcryptjs.hash(password, 12);
      const newUser = new User({
        fullname,
        username,
        gender,
        password: hashedPassword,
      });
      if (newUser) {
        await generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        return res.status(201).json({
          message: "Signed Up Successfully",
          user: {
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            gender: newUser.gender,
            profilePic: newUser.profilePic,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something Went Wrong." });
  }
};
