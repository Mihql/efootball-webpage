const User = require("../models/User");
const League = require("../models/League");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { ObjectId } = require("mongodb"); // Import ObjectId from mongodb package

// User Management

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", err });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  console.log(userId, "USERID-DELETE");
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  const { userId, username, role } = req.body;
  console.log(username, "TEST_USERNAME");
  console.log("Type of req.body:", typeof req.body); // Debugging: check the type

  try {
    // Convert the userId to an ObjectIds
    const userID = new ObjectId(userId);
    const updateUser = await User.findOneAndUpdate(
      userID,
      { username, role },
      { new: true, runValidators: true }
    );

    if (updateUser) {
      return res.json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User-profile updated succefully", user: updateUser });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Error updating user", err });
  }
};

exports.updateUserRole = async (req, res) => {
  const { userId, role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    res.status(200).json({ message: "Role updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Error updating Role", err });
  }
};

exports.register = async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const role = "admin";
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // // Check if the user already exists
    let user = await User.findOne({ email, username });
    if (user) {
      return res.status(400).json({ message: "User already exits" });
    }

    // Create a new user
    user = new User({ username, email, password, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });

    // const payload = { user: { id: user.id } };
    // jwt.sign(
    //   payload,
    //   process.env.JWT_SERCRET,
    //   { expiresIn: "1h" },
    //   (err, token) => {
    //     if (err) throw err;
    //     res.json({ token });
    //   }
    // );
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { email, password } = req.body; // Ensure req.body is defined
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "westie", {
      expiresIn: "1h",
    });

    res.json({
      user: {
        // message: "Login successful",
        id: user._id,
        email: user.email,
        name: user.username,
        role: user.role,
      },
      token,
    });
    console.log(user.username, "TEST_HERE");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: error.message });
  }
};
