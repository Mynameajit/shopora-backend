import { catchAsyncError } from "../middlewares/catchasyncerror.js";
import { User } from "../Models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
/** 
 @addAddress : Update user address
 @router : api/address/update
 @AccededBy Only Authenticated User 
 
  */
export const addAddress = catchAsyncError(async (req, res, next) => {

  const { fullName, mobileNumber, houseNo, city, state, pinCode, landMark } = req.body || {}
  // console.log(fullName, mobileNumber, houseNo, city, state, pinCode, landMark)

  // find
  const user = await User.findById(req.user?._id);
  if (!user) return next(new ErrorHandler("User Not Found", 400))


  // check existing address === save address 
  const normalize = str => str?.toString().trim().toLowerCase();
  const isDuplicate = user.addresses.some(address =>
    normalize(address.fullName) === normalize(fullName) &&
    normalize(address.mobileNumber) === normalize(mobileNumber) &&
    normalize(address.houseNo) === normalize(houseNo) &&
    normalize(address.city) === normalize(city) &&
    normalize(address.state) === normalize(state) &&
    normalize(address.state) === normalize(state) &&
    normalize(address.landMark) === normalize(landMark) &&
    normalize(address.pinCode) === normalize(pinCode)
  );

  if (isDuplicate) return next(new ErrorHandler(" This Address Already Exist", 400))


  // save address
  user.addresses.push({
    fullName, mobileNumber, houseNo, city, state, pinCode, landMark
  });
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Address added successfully',
    addresses: user
  });

})

export const updateAddress = catchAsyncError(async (req, res, next) => {
  const { _id, fullName, mobileNumber, houseNo, landMark, city, state, pinCode } = req.body;

  if (!_id) {
    return res.status(400).json({ success: false, message: "Address ID is required" });
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const address = user.addresses.id(_id);

  if (!address) {
    return res.status(404).json({ success: false, message: "Address not found" });
  }

  if (fullName) address.fullName = fullName;
  if (mobileNumber) address.mobileNumber = mobileNumber;
  if (houseNo) address.houseNo = houseNo;
  if (landMark) address.landMark = landMark;
  if (city) address.city = city;
  if (state) address.state = state;
  if (pinCode) address.pinCode = pinCode;

  // Step 4: Save user
  await user.save();

  res.status(200).json({
    success: true,
    message: "Address updated successfully",
    addresses: user.addresses, // returning full address list
  });
});




export const deleteAddress = catchAsyncError(async (req, res, next) => {
  const { _id } = req.body;
console.log(_id);

  if (!_id) {
    return res.status(400).json({ success: false, message: "Address ID is required" });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  // Remove address by _id from embedded addresses
  user.addresses = user.addresses.filter(addr => addr._id.toString() !== _id);

  await user.save();

  res.status(200).json({ success: true, message: 'Address deleted successfully', addresses: user.addresses });
});
