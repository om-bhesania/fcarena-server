import { instance } from '../server.js'
import crypto from 'crypto'

export const checkout = async (req, res) => {
    try {

        const options = {
            amount: Number(req.body.amount * 100),
            currency: 'INR',
        }
        const order = await instance.orders.create(options)
        res.status(200).json({
            success: true,
            order,
        })
    } catch(err){
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
}

export const paymentVerification = async (req, res) => {
    try{

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
        
        
        const body = razorpay_order_id + '|' + razorpay_payment_id
        
        const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_APT_SECRET)
        .update(body.toString())
        .digest('hex')
        
        const isAuthentic = expectedSignature === razorpay_signature
        
        if (isAuthentic) {
            res.json({
                success: true,
                id:razorpay_payment_id,
            })
    } else {
        res.json({
            success: false,
        })
    }
} catch(err){
    res.status(500).json({
        success: false,
        error: "Internal server error"
    });
}
}

export const Refund = async (req, res) => {
    try {
        const {payment_id } = req.params;

        const options = {
            amount: Number(req.body.amount * 100),
            speed: "normal",
            // receipt: "Receipt no."+count,
        }
        const refund_order = await instance.payments.refund(payment_id, options);
        
        res.status(201).json({
            success: true,
            data: refund_order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
}

export const find_refund = async(req,res) => {
    try{
        const {refund_id} = req.params;

        const refund_details = await instance.refunds.fetch(refund_id);

        res.status(200).json({
            success:true,
            data:refund_details,
        })

    } catch(error){
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
}