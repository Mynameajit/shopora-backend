import { catchAsyncError } from "../middlewares/catchasyncerror.js";
import { User } from "../Models/userModel.js";


export const allUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getMyProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.find({ _id: req.user._id }).select('-password')

    res.status(200).json({
        success: true,
        message: "Profile Fetched Successfully",
        user:user[0]

    })
})