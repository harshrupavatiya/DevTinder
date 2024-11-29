const express = require("express");
const { userAuth } = require("../middlewares/Auths");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateProfileEditData } = require("../utils/validator");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    throw new Error("Error : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Something went wrong.");
    }

    const userId = req.user._id;
    const data = req.body;

    const dataBefore = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true,
    });

    console.log(dataBefore);

    res.send("User Information Updated.");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

//Not Working at line --> 52,53
//TODO : bcrypt.compare && validatePassword both are not working
profileRouter.patch("/profile/password", async (req, res) => {
  try {
    const { emailId, oldPassword, newPassword } = req.body;

    const user = await User.find({ emailId: emailId });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await user.validatePassword(oldPassword);
    // const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new Error("Wrong Password");
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    user.password = passwordHash;

    await user.save();

    res.send("Password Reset Successfull");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = profileRouter;
