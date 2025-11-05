const express = require('express')
const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerConfig = require('../middlewares/imageMulterMiddleware')
const adminJwtMiddleware = require('../middlewares/adminJwtMiddleware')
const jobController = require('../controllers/jobController')
const pdfMulterConfig = require('../middlewares/pdfMulterMiddleware')
const applicationController = require('../controllers/applicationController')
const router = express.Router()

// register 
router.post('/register',userController.registerController)

router.post('/login',userController.loginController)

router.post('/google-login',userController.googleLoginController)

router.post('/add-book',jwtMiddleware,multerConfig.array('uploadImages',3),bookController.addBookController)

router.get('/home-books',bookController.getHomeBooks)
//add application
router.post('/application/add',jwtMiddleware,pdfMulterConfig.single('resume'),applicationController.addApplicationController)
//--------------------------------Authorized User---------------

router.get('/all-books',jwtMiddleware,bookController.getAllBooks)

router.get('/books/:id/view',jwtMiddleware,bookController.viewBookController)

//get user books
router.get('/user-books',jwtMiddleware,bookController.getAllUserBooksController)

//get user bought books
router.get('/user-bought-books',jwtMiddleware,bookController.getAllUserBoughtBooksController)

//delete user books
router.delete('/user-books/:id/remove',jwtMiddleware,bookController.deleteUserBookController)

//user profile update 
router.put('/user-profile/edit',jwtMiddleware,multerConfig.single('profile'),userController.userProfileEditController)

router.get('/get-allJobs',jobController.getAllJobController)

router.post('/make-payment',jwtMiddleware,bookController.makeBookPaymentController)

//-----------------Admin-----------------------
router.get('/all-user',adminJwtMiddleware,userController.getAllUsersController)

router.get('/admin-all-books',adminJwtMiddleware,bookController.getAllBooksAdminController)
//approve-book
router.put('/admin/book/approve',adminJwtMiddleware,bookController.updateBookStatusController)
//Edit Admin
router.put('/admin-profile/edit',adminJwtMiddleware,multerConfig.single('profile'),userController.adminProfileEditController)
//Add Job
router.post('/admin/addJob',adminJwtMiddleware,jobController.addJobController)
//Delete Job
router.delete('/job/:id/remove',adminJwtMiddleware,jobController.removeJobController)
//view application
router.get('/all-application',adminJwtMiddleware,applicationController.getApplicationController)

module.exports = router