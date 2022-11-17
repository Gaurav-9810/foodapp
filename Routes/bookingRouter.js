const express=require('express');


const bookingRouter=express.Router();
const {protectRoute}=require('../controller/authController');
const {createSession}=require('../controller/bookingController');
bookingRouter.post('/createSession', createSession);
bookingRouter.get('/createSession',function(req,res){
    res.sendFile('D:\\gaurav_folder\\gaurav\\pepcoding_webdev\\webdev\\14.Backend\\2.express\\booking.html');
});

module.exports=bookingRouter;