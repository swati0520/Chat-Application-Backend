const express = require('express');
const { createUser, loginUser, updateUser, deleteUser, forgetPassword, resetPassword, passwordReset, getUserdetails, getUserByName, getUserById, followUser } = require('../controllers/UserControllers');
const checkToken = require('../middleware/checkToken');
const router = express.Router();


router.post('/create',createUser)
router.post('/login', loginUser)
router.put('/update/:_id',checkToken,updateUser)
router.delete('/delete/:_id',deleteUser)
router.post('/forgetPassword', forgetPassword)
router.get('/resetToken/:token',resetPassword) 
router.post('/resetToken/:token',passwordReset)
router.get('/getUser',checkToken,getUserdetails)
router.get('/username',getUserByName);
router.get('/getuser/:_id',getUserById)
router.post('/followuser/:_id',checkToken,followUser)


module.exports = router


