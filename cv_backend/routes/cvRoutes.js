import express from "express";

import {
    getMyCVs,
    getCVById,
    createCV,
    updateCV,
    previewCV,
    downloadCV,
    shareCV,
    deleteCV
} from "../controllers/cvController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/" , authMiddleware, getMyCVs);
router.post("/" , authMiddleware, createCV);
router.get("/:id", authMiddleware, getCVById); // 🔥 EDITOR
router.put("/:id" , authMiddleware, updateCV);
router.get("/:id/preview" , authMiddleware, previewCV);
router.get("/:id/download" , authMiddleware, downloadCV);
router.get("/:id/share" , authMiddleware, shareCV);
router.delete("/:id" , authMiddleware, deleteCV);

export default router;