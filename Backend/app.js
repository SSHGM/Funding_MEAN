const express =require('express')
const app= express()
const bodyParser = require('body-parser'); 
const router =require("./Routes/fund.routes")
const db =require("./Dbconfig/fund.dbconfig")
db()
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json())
app.listen(3000,() =>
{
    console.log("Server is running at http://localhost:3000")
})

app.use("/",router)