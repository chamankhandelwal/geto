import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import { coursesRoute } from "./routes/course.js";
import { adminRoute } from "./routes/admin.js";
import Razorpay from "razorpay";
import cors from "cors";
import { userRoutes } from "./routes/user.js";
dotenv.config();
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => res.send("Server is listening..."));

app.use("/api", userRoutes);
app.use("/api", coursesRoute);
app.use("/api", adminRoute);

connectDb()
  .then(() => {
    console.log("DB connected");
    app.listen(port, () => {
      console.log(`Server is listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect DB:", err);
    process.exit(1);
  });
