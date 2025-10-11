const users = require('../models/userModel')
exports.registerController = async (req,res)=>{
    console.log("Inside Register API");
    // console.log(req.body);
    const {username,email,password} = req.body
    console.log(username,email,password);
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(409).json("User already exist!!! Please Login")
        }else{
            const newUser =  new users({
                username,
                email,
                password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    }catch{
          res.status(500).json(err)
    }
    
} 