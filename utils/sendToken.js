import { generateToken } from './generateToken.js'

//creating token & saving cookies
const sendToken = (user, statusCode, res, message) => {
    const token = generateToken(user)
    // console.log("jwt token", token)
    //options for cookies
    let options = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: true,           // ✅ required for HTTPS (Vercel/Render are HTTPS)
        sameSite: "None",       // ✅ required for cross-site cookies
    };


    res.status(statusCode).cookie('token', token, {
        httpOnly: true,
        secure: true,           // ✅ For HTTPS (vercel/render)
        sameSite: "none",       // ✅ Required for cross-origin
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })
    res.status(200).json({
        success: true,
        user,
    });
}

export default sendToken;