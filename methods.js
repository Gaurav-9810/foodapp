const express=require("express");
// const path = require("path");
const app=express();

app.use(express.static('public/build'));

const userModel=require('./model/UserModel');
const cookiesParser=require('cookie-parser');






app.use(express.json());
const port=process.env.PORT || 5000;
app.listen(port,function(){
      console.log(`server listening on port ${port}`);
});
app.use(cookiesParser());



//mini app
const userRouter=require('./Routes/userRoute.js');
const planRouter=require('./Routes/planRoute.js');
const authRouter=require('./Routes/authRoutes.js');
const reviewRouter=require('./Routes/reviewRouter.js');
const bookingRouter=require('./Routes/bookingRouter.js');

// app.get('/',(req,res) => {
//       res.sendFile(path.join(__dirname,'./public/index.html'));
//   });

//   app.get('/register',(req,res) => {
//       res.sendFile((__dirname,'./public/register.html'));
//   });

app.use("/user",userRouter);//global middleware 
app.use("/plans",planRouter);//global middleware 
app.use("/auth",authRouter);//global middleware
app.use('/review',reviewRouter);
app.use('/booking',bookingRouter);






