const User =require("../Models/User.model")
const  {validationResult}  = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const mailsend = require("../Middleware/mailsender");
const signup =
 
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {

      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry a user with this email already exists",
        });
      }
     
      let salt = await bcrypt.genSaltSync(10);
      let secured = await bcrypt.hashSync(req.body.password, salt);
      let userData = await User.create({
        name: req.body.name,
        password: secured,
        email: req.body.email,
      });
      const data = {
        user: {
          id: userData.id,
        },
      };
      // const authtoken = jwt.sign(data, "JWT_SECRET");
      // let emailCode = jwt.sign(data, "ACTIVATION_TOKEN_SECRET", {
      //   expiresIn: "20m",
      // });
      // let vericationEmailLink = `${"priyanshpankhaniya@gmail.com"}/activate/${emailCode}`;
      // await mailsend({
      //   email: userData.email,
      //   subject: "Verification Mail",
      //   url: vericationEmailLink,
      //   name: userData.name,
      // });
      success = true;
      return res.json({ success });
    } catch (error) {
      success = false;
      console.log(error);
      return res.send(500).json({ success: false, error });
    }
  }

   const login =  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(500).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(500).json({
          success: false,
          error: "Please try to login with correct credentials",
        });
      }
      
     
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          success: false,
          error: "Please try to login with correct credentials",
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      console.log("JWT_SECRET");
      const authtoken = jwt.sign(data, "JWT_SECRET");
      success = true;
      return res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Internal server error");
    }
  }
  
const getuser= async (req, res) => {
    try {
      let userId = req.user.id;
      const user = await User.findById(userId) .select("-password");
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
    
const getUsersName = async (req,res)=>{
  try {
    let {userId} = req.body;
    let user = await User.findById(userId).select("-password");
    if(!user){
      return res.status(404).json({success:false,msg:"No user found"});
    }
    return res.json({success:true, data:user.name})
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
}
    
  module.exports={login,signup,getuser,getUsersName}