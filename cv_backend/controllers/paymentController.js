import razorpay from "../config/razorPay.js";
import crypto from "crypto";
import { CVModel } from "../modals/cvModel.js";

/* CREATE ORDER */
export const createOrder = async (req, res) => {
  try {
    const { cvId } = req.body;

    if (!cvId) {
      return res.status(400).json({
        success: false,
        message: "CV ID is required",
      });
    }

    const cv = await CVModel.findById(cvId);
    if (!cv) {
      return res.status(404).json({
        success: false,
        message: "CV not found",
      });
    }

    const order = await razorpay.orders.create({
      amount: 19 * 100, // ✅ ₹19
      currency: "INR",
      receipt: `cv_${cvId}`,
    });

    cv.payment = {
      orderId: order.id,
      status: "pending",
    };

    await cv.save();

    return res.json({
      success: true,
      order,
    });

  } catch (err) {
    console.error("Create Order Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

/* VERIFY PAYMENT */
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cvId,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment data",
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    await CVModel.findByIdAndUpdate(cvId, {
      isPaid: true,
      payment: {
        status: "paid",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      },
    });

    return res.json({
      success: true,
      message: "Payment successful",
    });

  } catch (err) {
    console.error("Verify Payment Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
