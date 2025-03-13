const User = require("../models/userModel");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -otp");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const {
      title,
      firstName,
      lastName,
      occupation,
      maritalStatus,
      dateOfBirth,
      address,
      phone,
      socialLinks,
    } = req.body;

    // Validate age
    const dob = new Date(dateOfBirth);
    const today = new Date();
    const minAgeDate = new Date(today.setFullYear(today.getFullYear() - 18));
    if (dob > minAgeDate)
      return res
        .status(400)
        .json({ message: "User must be at least 18 years old." });

    // Validate phone format
    if (!/^\+\d{10,15}$/.test(phone)) {
      return res
        .status(400)
        .json({
          message: "Phone number must start with '+' and contain 10-15 digits.",
        });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.title = title || user.title;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.occupation = occupation || user.occupation;
    user.maritalStatus = maritalStatus || user.maritalStatus;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.address = address || user.address;
    user.phone = phone || user.phone;
    user.socialLinks = socialLinks || user.socialLinks;

    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -otp");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.banUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isBanned = !user.isBanned;
    await user.save();

    res.json({ message: `User ${user.isBanned ? "banned" : "unbanned"}` });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
