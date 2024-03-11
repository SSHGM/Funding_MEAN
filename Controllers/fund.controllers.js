const {Donater,Register } =require('../Models/fund.model')

const get= async (req,res)=>

{

}

const post=async (req,res)=>
{
  try{
        const data = await Register.create(req.body)
        res.json(data)
       
  }
  catch {
    (error)=> {
        console.log(error)
    }
  }

}



module.exports ={
    get , post
}