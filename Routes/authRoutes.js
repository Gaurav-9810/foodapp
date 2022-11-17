const express=require("express");
const authRouter=express.Router();
const userModel=require('../model/UserModel.js');
// const cookiesParser=require('../../node_modules/cookie-parser');
const jwt=require('jsonwebtoken');
const JWT_KEY='jdshfkjbdfkjbd';




authRouter
.route('/signup')
.get(middleware1,getSignUp,middleware2)
.post(postSignUp);

authRouter
.route('/login')
.post(loginUser)



function middleware1(req,res,next){
      console.log('middleware1 encounter');
      next();
}

function middleware2(req,res){
      console.log('middleware2 encounter');
 
// res.sendFile('../public/index.html', {root: __dirname});
res.sendFile('D:/gaurav folder/gaurav/pepcoding webdev/webdev/14.Backend/2.express/public/index.html');

//      res.sendfile('./public/404.html'); 
// res.send('heelo');
}

function getSignUp(req,res,next){
      console.log('get Signup called');
      next();
      //res.sendFile('/public/index.html',{root:__dirname});
}

async function postSignUp(req,res){
      let dataObj=req.body;
      let user=await userModel.create(dataObj);
      //  console.log('backend',user);
      res.json({
            message:"user Signup",
            data:user
      });
}

async function loginUser(req,res){
      // res.cookie('isLoggedIn',false);
     
     try{
       
            const data=req.body;
                  console.log(req.body);
                  let user=await userModel.findOne({email:data.email});
                 
                  if(data.email!=''){

                  
                  if(user!=null){
                        if(user.password==data.password){
                              // console.log(user);
                              const uid=user['_id'];
                              let token=jwt.sign({payload:uid},JWT_KEY)
                               res.cookie('isLogin',token,{httpOnly:true});
                              return res.json({
                                    message:"User has Logged in"
                              })
                        }
                        else{
                              return res.json({
                                    message:"wrong Password"
                              })
                        }
                  }
                  else{
                        return res.json({
                              message:"user  not Found"
                        })

                  }

            }
            else{
                  return res.json({
                        message:"email is empty "
                  })
            }
     }
     catch(err){
            return res.json({
                  message:err.message
            })
     }
     
}



module.exports=authRouter;