import User from '../models/user.model.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper: Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, role, first_name, last_name } = req.body;

        // Basic input validation
        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Name, email and password are required");
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400);
            throw new Error("User already exists");
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            first_name,
            last_name,
            password: hashedPassword,
            role: role || "customer",
        });

        // Send response with token
        res.status(201).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token: generateToken(user._id),
        });
    } catch (error) {
        next(error); // Pass error to centralized error handler
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400);
            throw new Error('Email and password are required');
        }

        // Find user and include password for comparison
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            res.status(401);
            throw new Error('Invalid email or password');
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401);
            throw new Error('Invalid email or password');
        }

        // Generate JWT token
        const token = generateToken(user._id);

        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        next(error);
    }
};

