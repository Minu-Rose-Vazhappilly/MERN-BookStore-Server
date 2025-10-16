const books = require('../models/bookModel')

exports.addBookController = async (req,res)=>{
    console.log("Inside addBookController");
    res.status(200).json("request received")
    
}