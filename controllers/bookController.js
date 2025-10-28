const books = require('../models/bookModel')

exports.addBookController = async (req,res)=>{
    console.log("Inside addBookController");
    // console.log(req.body);
    const {title,author,noOfPages,imageUrl,price,discountPrice,abstract,publisher,language,isbn,category} = req.body
    // console.log(req.files);
    const userMail = req.payload
    var uploadImg = []
    req.files.map(item => uploadImg.push(item.filename))
    console.log(title,author,noOfPages,imageUrl,price,discountPrice,abstract,publisher,language,isbn,category,uploadImg,userMail);
    try{
        const existingBook = await books.findOne({title,userMail})
        if(existingBook){
            res.status(401).json("You have already added the book")
        }else{
            const newBook = new books({
                title,author,noOfPages,imageUrl,price,discountPrice,abstract,publisher,language,isbn,category,uploadImg,userMail
            })
            await newBook.save()
            res.status(200).json(newBook)
        }

    }catch(err){
        res.status(500).json(err)
    }
    
}

exports.getHomeBooks = async(req,res) =>{
    console.log("Inside getHomeBooks");
    try{

        const allHomeBooks = await books.find().sort({_id:-1}).limit(4)
        res.status(200).json(allHomeBooks)

    }catch(err){
        res.status(500).json(err)
    }
    
}

exports.getAllBooks = async(req,res) =>{
    console.log("Inside getAllBooks");
    const searchKey = req.query.search
    const email = req.payload
    const query = {
        title:{$regex : searchKey,$options:'i'},
        userMail:{$ne:email}
    }
    try{

        const allBooks = await books.find(query)
        res.status(200).json(allBooks)

    }catch(err){
        res.status(500).json(err)
    }
    
}



exports.viewBookController = async (req, res) => {
    console.log("Inside ViewBookController");
    const {id} = req.params
    console.log(id);
    try{
        const viewBook = await books.findById({_id:id})
        res.status(200).json(viewBook)
    }catch(err){
        res.status(500).json(err)
    }
}

exports.getAllUserBooksController = async(req,res) =>{
    console.log("Inside getAllUserBooksController");
    const email = req.payload
    
    try{

        const allUserBooks = await books.find({userMail:email})
        res.status(200).json(allUserBooks)

    }catch(err){
        res.status(500).json(err)
    }
    
}

exports.getAllUserBoughtBooksController = async(req,res) =>{
    console.log("Inside getAllUserBoughtBooksController");
    const email = req.payload
    
    try{

        const allUserBoughtBooks = await books.find({bought:email})
        res.status(200).json(allUserBoughtBooks)

    }catch(err){
        res.status(500).json(err)
    }
    
}

exports.deleteUserBookController = async (req,res) =>{
    console.log("Inside deleteUserBookController");

    const {id} = req.params
    console.log(id);
    try{
        await books.findByIdAndDelete({_id:id})
        res.status(200).json("Deleted Successfully!!!")
    }
    catch(err){
        res.status(500).json(err)
    }
    
    
}

exports.getAllBooksAdminController = async(req,res)=>{
    console.log("Inside getgetAllBooksAdminController");
    try{
        const allAdminBooks = await books.find()
        res.status(200).json(allAdminBooks)
    }catch(err){
       res.status(500).json(err)
        
    }
    
}

exports.updateBookStatusController = async(req,res)=>{
    console.log("Inside updateBookStatusController");
    const {_id,title,author,noOfPages,imageUrl,price,discountPrice,abstract,publisher,language,isbn,category,uploadImg,userMail,bought} = req.body
    try{
        const updateBook = await books.findByIdAndUpdate({_id},{title,author,noOfPages,imageUrl,price,discountPrice,abstract,publisher,language,isbn,category,uploadImg,status:"approved",userMail,bought},{new:true})
        await updateBook.save()
        res.status(200).json(updateBook)
    }
    catch(err){
        res.status(500).json(err)
    }
    
}