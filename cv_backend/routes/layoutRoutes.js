import express from "express"
import { getLayouts } from "../controllers/layoutController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get('/', authMiddleware, getLayouts)

export default router;