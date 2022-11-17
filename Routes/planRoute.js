const express=require("express");
const planRouter=express.Router();
const {ProtectRoute , isAuthorised }=require('../controller/authController.js');
const{getPlan,getAllPlans,newplan,updatePlan,deletePlan, top3plans}=require('../controller/planController');



planRouter
.route('/createPlan')
.post(newplan);

planRouter
.route('/createPla/:id')
.patch(updatePlan)
.delete(deletePlan)


//all plans leke ayega
// planRouter.use(isAuthorised(["admin","restaurantowner"]))

planRouter.route('/allPlans')
.get(getAllPlans)





//own plan-> logged in necessary

planRouter.use(ProtectRoute)
planRouter.route('/plan/:id')
.get(getPlan)


//admin and restaurant owner can only create update or delete plans





 //top3plan
 planRouter
 .route('/top3')
 .get(top3plans);

 module.exports=planRouter;