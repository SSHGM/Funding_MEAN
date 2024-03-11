const express = require("express")
const router = express.Router()
const {get,post} = require("../Controllers/fund.controllers")
router.get("/reg",get);
router.post("/reg",post);
module.exports =router;