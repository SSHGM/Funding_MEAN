const recipe =require('../models/recipe.models')

const get= async (req,res)=>

{

}

const post=async (req,res)=>
{
  try{
        const data = await recipe.create(req.body)
        res.json(data)
        console.log(data)
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