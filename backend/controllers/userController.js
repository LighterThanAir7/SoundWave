import bcrypt from "bcryptjs";
import {
  createUser,
  getUserByEmail,
  checkExistingUsername,
  checkUsernameCapacity,
  incrementCapacityAttempts,
  logUsernameCapacityReached, getUsersModel, getUserByIdModel, updateUserModel
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

export const getUsers = async (req, res) => {
  try {
    const users = await getUsersModel();
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      message: "Error fetching users",
      error: error.message
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserByIdModel(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User retrieved successfully",
      user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      message: "Error fetching user",
      error: error.message
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    // Provjeri postoji li korisnik
    const existingUser = await getUserByIdModel(userId);
    if (!existingUser) {
      return res.status(404).json({
        message: "Korisnik nije pronađen"
      });
    }

    // Ažuriraj korisnika koristeći model funkciju
    const updated = await updateUserModel(userId, updateData);

    if (updated) {
      // Dohvati ažuriranog korisnika
      const updatedUser = await getUserByIdModel(userId);

      return res.status(200).json({
        message: "Korisnik uspješno ažuriran",
        user: updatedUser
      });
    } else {
      return res.status(400).json({
        message: "Ažuriranje korisnika nije uspjelo"
      });
    }
  } catch (error) {
    console.error('Greška prilikom ažuriranja korisnika:', error);
    res.status(500).json({
      message: "Greška prilikom ažuriranja korisnika",
      error: error.message
    });
  }
};
