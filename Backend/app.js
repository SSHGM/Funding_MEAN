const express= require('express');
const app =express()
const db= require('./Dbconfig/fund.mongodb');
const cors = require('cors');

const router=require('./Routes/fund.routes')

app.use(express.json());
app.use(cors());


app.use('/',router)

db();


app.listen(4000, () => {
  console.log('Server Running at:http://localhost:4000');
});
