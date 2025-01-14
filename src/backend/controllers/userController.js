import bcrypt from "bcrypt";
import {
  createUser,
  getUserByEmail,
  checkExistingUsername,
  checkUsernameCapacity,
  incrementCapacityAttempts,
  logUsernameCapacityReached
} from "../models/userModel.js";
import { generateUniqueDiscriminator } from "../helpers/userHelper.js";

export const registerUser = async (req, res) => {
  try {
    const {
      email,
      password,
      personalInfo,
      preferences
    } = req.body;

    // Check if user exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists"
      });
    }

    try {
      // Generate unique discriminator
      const discriminator = await generateUniqueDiscriminator(personalInfo.displayName);

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user with model function
      const userId = await createUser({
        email,
        password: hashedPassword,
        displayName: personalInfo.displayName,
        dateOfBirth: `${personalInfo.dateOfBirth.year}-${personalInfo.dateOfBirth.month}-${personalInfo.dateOfBirth.day}`,
        gender: personalInfo.gender,
        discriminator,
        marketingConsent: preferences.notifications,
        dataSharingConsent: preferences.dataSharing
      });

      res.status(201).json({
        message: "User registered successfully",
        username: `${personalInfo.displayName}#${discriminator}`
      });

    } catch (error) {
      if (error.message.includes("no available discriminators")) {
        return res.status(400).json({
          message: error.message
        });
      }
      throw error;
    }

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      message: "Error registering user",
      error: error.message
    });
  }
};
