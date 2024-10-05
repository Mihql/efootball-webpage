const express = require("express");
const router = express.Router();
const {
  register,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  registerToLeague,
  deleteUser,
} = require("../controller/authController");

router.post("/register", register);
router.post("/login", loginUser);
router.get("/users", getAllUsers);
router.delete("/usersDelete/:userId", deleteUser);

router.get("/users/:userId", getUserById);
router.post("/update-user", updateUser);

module.exports = router;
