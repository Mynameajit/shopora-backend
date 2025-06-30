import mongoose, { Types } from 'mongoose'

const addressSchema = new mongoose.Schema({
    fullName: { type: String, required: [true, "Name is required"] },
    mobileNumber: { type: String, required: [true, "Contact Number  is required"] },
    houseNo: { type: String, required: [true, "House number is required"] },
    city: { type: String, required: [true, "city is required"] },
    state: { type: String, required: [true, "state is required"] },
    pinCode: { type: String, required: [true, "zip is required"] },
    landMark: { type: String, required: [true, "Land Mark is required"] },

},);

export const Address = mongoose.model("Address", addressSchema);




const userSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true,
        trim: true,
    },
    email: {
        type: "string",
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: "string",
        required: true,
        unique: true,
    },
    role: {
        type: "string",
        enum: ['user', 'admin'],
        default: "user"
    },
    addresses: [addressSchema]
}, { timestamps: true })

export const User = mongoose.model('User', userSchema)