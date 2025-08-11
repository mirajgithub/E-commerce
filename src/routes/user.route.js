import express from "express";
import { getUserdetails, updateUserDetails } from '../controllers/user.controller.js'
import { protect } from "../middlewares/authMiddlewares.js";
const router = express.Router();

router.get('/profile', protect, getUserdetails);
router.post('/updateuser', protect, updateUserDetails);

export default router;