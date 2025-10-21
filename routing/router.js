const express = require('express')
const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerConfig = require('../middlewares/imageMulterMiddleware')
const router = express.Router()

// register 
router.post('/register',userController.registerController)

router.post('/login',userController.loginController)

router.post('/google-login',userController.googleLoginController)

router.post('/add-book',jwtMiddleware,multerConfig.array('uploadImages',3),bookController.addBookController)

router.get('/home-books',bookController.getHomeBooks)

router.get('/all-books',jwtMiddleware,bookController.getAllBooks)

router.get('/books/:id/view',jwtMiddleware,bookController.viewBookController)

module.exports = router