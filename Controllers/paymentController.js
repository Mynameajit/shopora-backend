import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});



export const createOrder = async (req, res) => {
    try {
        // console.log(req.body);
        const { amount } = req.body;

        // ✅ Validate amount
        if (!amount || typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ error: 'Invalid or missing amount' });
        }
        const options = {
            amount: amount * 100, // convert to paise
            currency: 'INR',
            receipt: `rcpt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);

    }
};





export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Signature verify formula
    const sign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (sign === razorpay_signature) {
      res.status(200).json({ success: true, message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Verification Error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
