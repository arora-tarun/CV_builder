import express from "express";
import { registerUser, loginUser, getAllUsers, getProfile } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import passport from "../config/googleConfig.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", getAllUsers)

// Google login start
router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: `${process.env.FRONTEND_URL}/login`, session:false }),
  (req, res) => {
    const token = req.user.token;
    // Redirect user to frontend OAuth callback route with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/google/callback?token=${token}`);
  }
);
router.get("/dashboard", authMiddleware, getProfile);
export default router;
