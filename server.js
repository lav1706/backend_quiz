import express from "express";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import { scheduleTasks } from "./config/cron.js";
import authRoutes from "./routes/authRoutes.js";
import quizRoutes from "./routes/quizeRoutes.js";

const app = express();

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/quizzes", limiter);

connectDB();
scheduleTasks();

app.use("/auth", authRoutes);
app.use("/quizzes", quizRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
