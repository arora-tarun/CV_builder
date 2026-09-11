import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import cvRoutes from "./routes/cvRoutes.js";
import layoutRoutes from "./routes/layoutRoutes.js";
import passport from "./config/googleConfig.js";
import { seedLayouts } from "./seeds/layoutSeed.js";
import paymentRoutes from "./routes/paymentRoutes.js"



const app = express();
const PORT = process.env.PORT || 4000;



//  CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(passport.initialize());


//  DB + SEEDS
connectDB().then(async () => {
  await seedLayouts();
});

// ROUTES
app.use("/auth", authRoute);
app.use("/cv", cvRoutes);
app.use("/layout", layoutRoutes);
app.use("/payment", paymentRoutes);

// TEST
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
