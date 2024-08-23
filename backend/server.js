import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
// import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log("Servessr running on port sss5000"));
