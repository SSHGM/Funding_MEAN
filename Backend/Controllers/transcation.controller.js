const Startup =require('../Models/Startup.model')
const User =require('../Models/User.model')
const Order=require('../Models/Order.model')
const Razorpay = require("razorpay");
const Review = require('../Models/Review.model');
const bcrypt = require("bcryptjs");


const grk=(req, res) => {
    return res.json({ success: true, key: "RAZORPAY_KEY_ID" })
  }

const creato =async (req, res) => {
    try {
      const instance = new Razorpay({
        key_id: "RAZORPAY_KEY_ID",
        key_secret: "RAZORPAY_SECRET",
      });
      const options = {
        amount: req.body.amount,
        currency: "INR",
      };
      const order = await instance.orders.create(options);
      if (!order) {
        return res.status(500).json({ success: false, msg: "Some error occured" });
      }
      res.json({ success: true, order });
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message });
    }
  };
const payo=async (req, res) => {
    try {
      const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature, investor_id, startup_id } =
        req.body;
      const newOrder = Order({
        isPaid: true,
        amount: amount,
        investor_id,
        startup_id,
        razorpay: {
          orderId: razorpayOrderId,
          paymentId: razorpayPaymentId,
          signature: razorpaySignature,
        },
      });
      let startup = await Startup.findById(startup_id);
      await Startup.findByIdAndUpdate(startup_id, { Current: startup.Current + amount, Backers: startup.Backers + 1 });
      await newOrder.save();
      res.json({
        success: true,
        msg: 'Payment was successfull',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: error.message });
    }
  };
const gett= async (req, res) => {
    try {
      let userOrders = await Order.find({ investor_id: req.user.id });
      if (userOrders.length === 0) {
        return res.status(404).json({ success: false, msg: "No transactions yet" });
      }
      return res.json({ success: true, data: userOrders });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error.message });
    }
  };


const review=async (req, res) => {
    try {
      let { ideaRating, approachRating, websiteRating, instagramRating, Startup_id, overallRating } = req.body;
      let review = Review({
        Startup_id,
        ideaRating,
        approachRating,
        websiteRating,
        instagramRating,
        overallRating
      });
      let userReview = await review.save();
      if (!userReview) {
        return res.status(500).json({ success: false, msg: "Cannot Save the file" });
      }
      return res.json({ success: true, msg: "Successfully Submitted" });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error.message });
    }
  };

const gstartupt=async (req,res)=>{
    try{
      let {startup_id} = req.body;
      let transactions = await Order.find({
        startup_id
        });
      if(transactions.length === 0){
        return res.json({success:false, msg:"No Transactions Found"});
      }
      return res.json({success:true, data: transactions});
    }
    catch(error){
      return res.status(500).json({ success: false, msg: error.message });
    }
  };

const changePass = async (req, res) => {
    try {
      let { currentPassword, newPassword } = req.body;
      let user = await User.findById(req.user.id);
      const passwordCompare = await bcrypt.compare(currentPassword, user.password);
      let salt = await bcrypt.genSaltSync(10);
      let secured = await bcrypt.hashSync(newPassword, salt);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({
            success: false,
            error: "Incorrect credentials",
          });
      }
      await User.findByIdAndUpdate(user._id, { password: secured }).then(() => {
        return res.json({ success: true, msg: "Changed Password Successfully!" })
      });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error.message });
    }
  };


module.exports={grk,creato,payo,review,gstartupt,changePass,gett}