import { catchAsyncError } from "../middlewares/catchasyncerror.js";
import { Contact } from "../Models/contactModel.js";


export const createContact = catchAsyncError(async (req, res) => {

    const { name, email, message } = req.body;
    const contact = await Contact.create({ name, email, message, user: req.user._id })
    res.status(201).json({ message: "Contact created successfully", contact });


})