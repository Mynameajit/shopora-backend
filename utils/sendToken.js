import { generateToken } from './generateToken.js'

//creating token & saving cookies
const sendToken = (user, statusCode, res, message) => {
    const token = generateToken(user)
    // console.log("jwt token", token)
    //options for cookies
    let options = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    };


    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        message,
        user: {
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    });
}

export default sendToken;