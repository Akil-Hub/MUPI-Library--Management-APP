import express from "express";

import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./database/db.js";
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";
import authRouter from "./routes/authRouter.js";
import bookRouter from "./routes/bookRouter.js";
import userRouter from "./routes/userRouter.js";
import borrowRouter from "./routes/borrowRouter.js";
import expressFileUpload from "express-fileupload";
import { notifyUsers } from "./services/notifyUser.js";
import { removeUnverifiedAccount } from "./services/removeUnverifiedAccount.js";
export const app = express();
config({ path: "./config/config.env" });
const frontendUrl = process.env.FRONTEND_URL;

if (!frontendUrl) {
  console.error("Frontend url is not define in .env");
  process.exit(1);
}

app.use(
  cors({
    origin: [frontendUrl],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  expressFileUpload({
    useTempFiles: true,

    tempFileDir: "/temp/",
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/borrow", borrowRouter);
app.use("/api/v1/user", userRouter);

notifyUsers();
removeUnverifiedAccount();

connectDB();
app.use(errorMiddleware);
