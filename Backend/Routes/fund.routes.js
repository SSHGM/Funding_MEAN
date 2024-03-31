const express = require("express");
const router = express.Router();
const{login,signup,getuser, getUsersName}=require('../Controllers/user.controller')
const {cstartup,fustartup, fstartup, gfstartup, fstartupr}=require('../Controllers/startup.controller')
const fetchuser = require("../Middleware/fetchuser");
const { grk, creato, payo, gett, review, gstartupt, changePass } = require("../Controllers/transcation.controller");
// const usvali = require("../Middleware/uservalidator");

router.post('/signup',signup);
router.post('/login',login);
router.post('/create-startup',fetchuser,cstartup);
router.get('/getuser', fetchuser,getuser)
router.get('/fetchuserStartups', fetchuser, fustartup)
router.post('/fetch-startup',fstartup)
router.get('/fetch-startups', fetchuser, gfstartup);
router.get("/get-razorpay-key",grk)
router.post("/create-order", fetchuser,creato)
router.post('/pay-order', payo)
router.get("/getTransactions", fetchuser,gett )
router.post("/review", fetchuser,review)
router.post("/fetchstartupReview",fstartupr)
router.post('/getStartupsTransactions',gstartupt)
router.post('/getUsersName',fetchuser,getUsersName)
router.post("/changePassword", fetchuser, changePass)
router.post("/email/activation",)
module.exports = router;
