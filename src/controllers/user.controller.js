import User from '../models/user.model.js'

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

export const updateUserdetails = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        const userUpdate = User.findByIdAndUpdate(user._id);

    } catch (error) {
        next(error)
    }
}