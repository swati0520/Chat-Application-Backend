const express = require('express');
const { createPost, updatePost, deletePost, getAllPost, getYourPost, getFriendPost, commentsPost, deleteComment, likesorDislike } = require('../controllers/postController');
const checkToken = require('../middleware/checkToken');
// const { getUserdetails } = require('../controllers/UserControllers');
const router = express.Router();



router.post('/create',checkToken,createPost)  
router.put('/update/:_id',updatePost )
router.delete('/delete/:_id',deletePost)
router.get('/getAllPost',getAllPost),
router.get('/getYourPost',checkToken,getYourPost)
router.get('/getFriendPost/:_id',getFriendPost)
router.post('/comment/:postId',checkToken,commentsPost)
router.delete('/commentDelete/:commentId/:postId',deleteComment)
router.put('/likePost/:postId/',checkToken,likesorDislike)


module.exports = router;

