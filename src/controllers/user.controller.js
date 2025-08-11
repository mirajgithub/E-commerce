import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
export const getUserdetails = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        res.json({
            id: user._id,
            name: user.name,
            role: user.role
        })

    } catch (error) {
        next(error)
    }
}

export const updateUserDetails = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Whitelist of fields user is allowed to update
        const allowedFields = ['first_name', 'last_name', 'email', 'phone'];

        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                user[field] = req.body[field];
            }
        });

        // If password is provided, hash it
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        await user.save();

        res.status(200).json({
            message: 'User updated successfully',
            user
        });
    } catch (error) {
        next(error);
    }
};
