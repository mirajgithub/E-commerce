import express from "express";
import { getUserdetails } from '../controllers/user.controller.js'
import { protect } from "../middlewares/authMiddlewares.js";
const router = express.Router();

router.get('/profile', protect, getUserdetails);

export default router;