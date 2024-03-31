const mongoose = require("mongoose");



const db= () => {
  try{
    mongoose.connect('mongodb://localhost:27017/Funding')
    console.log("Connected Succesfully")
    }
    catch{
        (error) => console.log(error);
    }
};
module.exports = db;
