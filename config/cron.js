import cron from "node-cron";
import updateQuizResults from "../models/Quiz.js";

export const scheduleTasks = () => {
  // Update quiz results every minute
  cron.schedule("* * * * *", () => {
    updateQuizResults();
  });
};
