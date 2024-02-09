import express from "express";
import {
  Refund,
  checkout,
  paymentVerification,
  find_refund,
} from "../controllers/PaymentControllers.js";

const router = express.Router();

router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);

router.route("/refund/:payment_id").post(Refund);

router.route("/refundDetails/:refund_id").get(find_refund);

export default router;