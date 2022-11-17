const express=require("express");
const userRouter=express.Router();
// const cookiesParser=require('cookie-parser');
// const {ProtectRoute}=require('./authHelper.js');
const{getUser,updateUser,deleteUser,getAllUser,updateProfileImage}=require('../controller/userController');
const { appendFile } = require("fs");
const{signup ,login , isAuthorised , ProtectRoute,forgetpassword,resetpassword,logout}=require('../controller/authController.js');
const { startsWith } = require("lodash");
const multer=require('multer');

const app=express();
//user ke options
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/signup')
.post(signup)

userRouter
.route('/login')
.post(login);

userRouter
.route('/forgetpassword')
.post(forgetpassword);


userRouter
.route('/resetpassword/:token')
.post(resetpassword);

userRouter
.route('/logout')
.get(logout)

//multer for fileupload
// upload->Storage , filter 
// upload-> storage , filter
const multerStorage=multer.diskStorage({
      destination:function(req,file,cb){
          cb(null,'D:\\gaurav_folder\\gaurav\\pepcoding_webdev\\webdev\\14.Backend\\2.express\\public\\images')
      },
      filename:function(req,file,cb){
          cb(null,`user-${Date.now()}.jpeg`)
      }
  });
  
  const filter = function (req, file, cb) {
      if (file.mimetype.startsWith("image")) {
        cb(null, true)
      } else {
        cb(new Error("Not an Image! Please upload an image"), false)
      }
    }
  
  const upload = multer({
      storage: multerStorage,
      fileFilter: filter
    });
  
    userRouter.post("/ProfileImage", upload.single('photo') ,updateProfileImage);
    //get request
    userRouter.get('/ProfileImage',(req,res)=>{
        res.sendFile('D:\\gaurav_folder\\gaurav\\pepcoding_webdev\\webdev\\14.Backend\\2.express\\multer.html');
    });


//profile page 
userRouter.use(ProtectRoute);//middleware who is checking is user is login  before visiting /userprofile
userRouter
.route('/userProfile')
.get(getUser);



//admin specific function
userRouter.use(isAuthorised(['admin']));
userRouter
.route('')
.get(getAllUser)







module.exports=userRouter;