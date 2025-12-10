import cron from "node-cron";
import { Borrow } from "../models/borrowModel.js";
import { User } from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";

export const notifyUsers = () => {
  cron.schedule("*/30 * * * * *", async () => {
    try {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const borrowers = await Borrow.find({
        dueDate: {
          $lt: oneDayAgo,
        },
        returnDate: null,
        notified: false,
      }).populate('user', 'email name');
      
      for (const element of borrowers) {
        if (element.user && element.user.email) {
     
          sendEmail(
          element.user.email,
          "Book Return Reminder",
           `Hello ${element.user.name},\n\nThis is a reminder that book you borrowed its only one day left to return . Return it within the time otherwise penalty fine will be added.`,
          );
          element.notified = true;

          await element.save();
          console.log(`Email send to ${element.user.email}`);
        }
      }
    } catch (error) {
      console.error("Some error occurred while notifying users error.", error);
    }
  });
};
