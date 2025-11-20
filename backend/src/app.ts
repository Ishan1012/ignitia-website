import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/AuthRoutes";

dotenv.config();

const app: Application = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://ignitia-website-alpha.vercel.app",
  
];

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// }));
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

export default app;