// controllers.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Quiz from "../models/Quiz.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { user: { id: user._id, username: user.username } },
      JWT_SECRET
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

export const createQuiz = async (req, res) => {
  try {
    const { question, options, rightAnswer, startDate, endDate } = req.body;
    const quiz = new Quiz({
      question,
      options,
      rightAnswer,
      startDate,
      endDate,
      createdBy: req.user.id,
    });
    await quiz.save();
    res.status(201).json({ message: "Quiz created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create quiz" });
  }
};

export const getActiveQuiz = async (req, res) => {
  try {
    const now = new Date();
    const activeQuiz = await Quiz.findOne({
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now },
    });
    res.json(activeQuiz);
  } catch (error) {
    res.status(500).json({ message: "Failed to get active quiz" });
  }
};

export const getQuizResult = async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const now = new Date();
    if (now < quiz.endDate.getTime() + 5 * 60 * 1000) {
      return res.status(403).json({ message: "Result is not available yet" });
    }

    const result = {
      correctAnswer: quiz.rightAnswer,
      additionalInfo: "Add your additional info here",
    };
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to get quiz result" });
  }
};
