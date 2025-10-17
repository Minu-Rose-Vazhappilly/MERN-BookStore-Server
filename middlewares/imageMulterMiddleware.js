const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,`image-${Date.now()}-${file.originalname}`)
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'){
        cb(null,true)
    }else{
        cb(null,false)
        return cb(new Error("Accept only png,jpg jpeg files"))
    }
}

const multiConfig = multer({
    storage,
    fileFilter
})

module.exports = multiConfig