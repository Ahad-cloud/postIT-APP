import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import UserModel from "./Models/UserModel.js";
import course from "./Models/course.model.js";
import * as ENV from "./config.js";

const app = express();

app.use(express.json());
app.use(cors());

// Database connection
const connectString =
  "mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASSWORD}@${ENV.DB_CLUSTER}/${ENV.DB_NAME}?retryWrites=true&w=majority&appName=PostITCluster";
mongoose.connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Register user
app.post("/registerUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.send({ user, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Login user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(500).json({ error: "User not found!" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    res.status(200).json({ user, message: "Success." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Logout user
app.post("/logout", async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

// Save post
app.post("/savePost", async (req, res) => {
  try {
    const { postMsg, email } = req.body;
    const post = new PostModel({
      postMsg,
      email,
    });
    await post.save();
    res.send({ post, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Get posts
app.get("/getPosts", async (req, res) => {
  try {
    const posts = await PostModel.find({}).sort({ createdAt: -1 });
    const countPost = await PostModel.countDocuments({});
    res.send({ posts, count: countPost });
  } catch (err) {
    res.status(500).json({ error: "An error occurred" });
  }
});

const port = ENV.PORT || 3001;
app.listen(port, () => {
  console.log(`You are connected at port: ${port}`);
});
