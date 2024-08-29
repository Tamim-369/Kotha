export const logoutController = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    return res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something Went Wrong." });
  }
};
