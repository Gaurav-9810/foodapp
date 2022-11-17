const express=require("express");
const reviewRouter=express.Router();
const {ProtectRoute  }=require('../controller/authController.js');
const{getAllReviews,top3reviews,getPlanReviews,createReview,updateReview,deleteReview}=require('../controller/reviewController');




reviewRouter
.route('/all')
.get(getAllReviews);

reviewRouter
.route('/top3')
.get(top3reviews);

//plan ki id
reviewRouter
.route('/:id')
.get(getPlanReviews);

// reviewRouter.use(ProtectRoute);
reviewRouter
.route('/cReview/:plan')
.post(createReview)
.patch(updateReview)
.delete(deleteReview);



module.exports=reviewRouter;