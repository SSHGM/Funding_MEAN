const express =require("express");
const app = express()
const {get,post} = require("../Controllers/fund.controllers")
app.get("/reg",get);
app.post("/reg",post);