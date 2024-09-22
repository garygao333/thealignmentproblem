import User from "../models/userModel.js";

const signupUser = async (req, res) => {
  const { email, username, userId } = req.body;
  try {
    const user = await User.signup(email, username, userId);
    res.status(200).json({ email, username, userId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { _id, email, name } = user;
    res.json({ _id, email, name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { signupUser, getProfile };
