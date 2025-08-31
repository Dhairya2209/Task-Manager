import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";
import forgotPasswordRouter from "./routes/forgotPassword.js";

// app config
dotenv.config();
const app = express();
const port = process.env.PORT || 8001;
mongoose.set("strictQuery", true);

// middlewares
app.use(express.json());

// ✅ CORS setup with localhost + your Vercel frontend
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local dev frontend
      "https://task-manager-git-main-dhairyas-projects-58867549.vercel.app", // deployed frontend (Vercel)
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// handle preflight requests
app.options("*", cors());

// db config
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("✅ DB Connected");
    }
  }
);

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/forgotPassword", forgotPasswordRouter);

// listen
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
