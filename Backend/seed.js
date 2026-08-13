require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing users if they exist
    await User.deleteMany({
      email: { $in: ["himanshuantal26@gmail.com", "teacher@example.com", "student@example.com"] }
    });

    const hashedPassword = await bcrypt.hash("Password@123", 10);

    const admin = await User.create({
      name: "Admin User",
      email: "himanshuantal26@gmail.com",
      password: hashedPassword,
      role: "admin",
      isVerified: true,
      isActive: true
    });
    console.log("Admin seeded:", admin.email);

    const teacher = await User.create({
      name: "Teacher User",
      email: "teacher@example.com",
      password: hashedPassword,
      role: "teacher",
      isVerified: true,
      isActive: true
    });
    console.log("Teacher seeded:", teacher.email);

    const student = await User.create({
      name: "Student User",
      email: "student@example.com",
      password: hashedPassword,
      role: "student",
      isVerified: true,
      isActive: true
    });
    console.log("Student seeded:", student.email);

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seed();
