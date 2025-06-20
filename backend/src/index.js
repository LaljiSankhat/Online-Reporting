import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import reportRoutes from "./routes/report.route.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

const __dirname = path.resolve();


app.use(express.json({ limit: "100mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


// if(process.env.NODE_ENV === "production"){
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   })
// }


// app.use("/api/auth", authRoutes);
// app.use("/api/report", reportRoutes)

app.use("/api/auth", authRoutes);
app.use("/api/report", reportRoutes);

//  Serve static files AFTER API routes
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Fallback only for non-API routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


app.listen(PORT, () => {
  console.log("server is running on PORT : ", PORT);
  connectDB();
});
