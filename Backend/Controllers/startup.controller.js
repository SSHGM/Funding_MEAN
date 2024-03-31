const  {body,validationResult}  = require("express-validator");
const Review=require('../Models/Review.model')
const Startup =require("../Models/Startup.model")
const cstartup= async (req, res) => {
  let Founder_id = req.user.id;
  try {
    const {
      Name,
      Description,
      Website,
      Email,
      Instagram,
      LinkedIn,
      LogoUrl,
      Category,
      Vision,
      Problemstatement,
      Solution,
      Ask,
    } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    let existed = await Startup.findOne({ Name });
    let startup = Startup({
      Founder_id,
      Name,
      Description,
      Website,
      Email,
      Instagram,
      LinkedIn,
      LogoUrl,
      Category,
      Vision,
      Problemstatement,
      Solution,
      Ask
    });
    if (existed) {
      return res.status(400).json({ success: false, msg: "Please Enter a unique name" });
    }
    let savedStartup = await startup.save();
    return res.json({ success: true, msg: "Congratulations!! Your registration has been successfully Submitted." })

  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
}
const fustartup=async (req, res) => {
  try {
    let user_id = req.user.id;
    let data = await Startup.find({ Founder_id: user_id });
    if (data.length === 0) {
      return res.status(404).json({ success: false, msg: "No Startup Found for the User" })
    }
    return res.json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
const fstartup=async (req, res) => {
  try {
    const { startup_id } = req.body;
    let startupsData = await Startup.findById(startup_id);
    if (!startupsData) {
      return res.status(404).json({ success: false, error: "Could not find any startups right now" });
    }
    return res.status(200).json({ success: true, data: startupsData });
  }
  catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
} 

const gfstartup=async (req, res) => {
  try {
    let startups = await Startup.find({ isVerified: false });
    if (startups.length === 0) {
      return res.status(404).json({ success: false, error: "Could not find any startups right now" });
    }
    return res.status(200).json({ success: true, data: startups });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
}

const fstartupr =async (req, res) => {
  try {
    const { startup_id } = req.body;
    const data = await Review.find({
      Startup_id: startup_id
    });
    if (data.length === 0) {
      return res.json({ success: false, msg: "No Startup Available" })
    }
    else {
      let avOverall = 0;
      data.forEach(element => {
        let a = element.overallRating;
        avOverall = avOverall + a;
      });
      return res.json({ success: true, ReviewData: { rating: Math.floor(avOverall / data.length) , totalReview: data.length } });
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports={cstartup,fustartup,fstartup,gfstartup,fstartupr}