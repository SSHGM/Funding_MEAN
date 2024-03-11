const mongoose  = require("mongoose");

const Regsch = mongoose.Schema({
  Name: {
    type: String,
  },

  Phone: {
    type: String,
  },
  CompanyName: {
    type: String,
  },
  Address: {
    type: String,
  },
  Email: {
    type: String,
  },
  Desgination: {
    type: String,
  },

  Type: {
    type: String,
  },

  Info: {
    type: String,
  },
});

const Usersch = mongoose.Schema({
 
  firstName: {
    String,
  },
  lastName: {
    String,
  },
  email: {
    String,
  },
  phone: {
    String,
  },
  address: {
    String,
  },
  donations: [
    {
      amount: { Number },
      date: { Date },
      description: { String },
    },
  ],
});

const Register = mongoose.model("Register", Regsch);
const Donater=  mongoose.model("Donater",Usersch)
module.exports = {Register,Donater};
