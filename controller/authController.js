const express=require("express");
const authRouter=express.Router();
const userModel=require('../model/UserModel.js');
// const cookiesParser=require('../../node_modules/cookie-parser');
const jwt=require('jsonwebtoken');
const { message } = require("statuses");
const JWT_KEY='jdshfkjbdfkjbd';


//sign up user
module.exports.signup=async function signup(req,res){
      try{
         let dataObj=req.body;
      let user=await userModel.create(dataObj);
      if(user){
         return res.json({
            message:"user Sign up",
            data:user
      });   
      }
      else{
          return  res.json({
                  message:"error while signup"
                  
            }); 
      }
      //  console.log('backend',user);
        
      }
      catch(err){
          return  res.json({
                  message:err.message  
            }); 
      }
}

//login user
// module.exports.login=async function login(req,res){
//       // res.cookie('isLoggedIn',false);
     
//      try{
       
//             const data=req.body;
//                   // console.log(req.body);
//                   let user=await userModel.findOne({email:data.email});
                 
//                   if(data.email!=''){

                  
//                   if(user!=null){
//                         if(user.password==data.password){
//                               // console.log(user);
//                               let uid=user['_id'];
//                               let token=jwt.sign({payload:uid},JWT_KEY);
//                                res.cookie('isLogin',token,{httpOnly:true});
//                               return res.json({
//                                     message:"User has Logged in",
//                                     data:user
//                               })
//                         }
//                         else{
//                               return res.json({
//                                     message:"wrong passwords or wrong email"
//                               })
//                         }
//                   }
//                   else{
//                         return res.json({
//                               message:"user  not Found"
//                         })

//                   }

//             }
//             else{
//                   return res.json({
//                         message:"email is empty "
//                   })
//             }
//      }
//      catch(err){
//             return res.json({
//                   message:err.message
//             })
//      }
     
// }

module.exports.login = async function login(req, res) {
      try {
        let data = req.body;
        if (data.email) {
          let user = await userModel.findOne({ email: data.email });
          if (user) {
            //bcrypt -> compare
            if (user.password == data.password) {
              let uid = user["_id"]; //uid
              let token = jwt.sign({ payload: uid }, JWT_KEY);
              res.cookie("login", token, { httpOnly: true });
              // res.cookie('isLoggedIn',true);
              return res.json({
                message: "User has logged in",
                data: user, // userDetails:data,
              });
            } else {
              return res.json({
                message: "wrong credentials",
              });
            }
          } else {
            return res.json({
              message: "User not found",
            });
          }
        } else {
          return res.json({
            message: "Empty field found",
          });
        }
      } catch (err) {
        return res.status(500).json({
          message: err.message,
        });
      }
    };

// isAuthorised to check the user role['admin','client']

module.exports.isAuthorised=function isAuthorised(roles){

      return  function(req,res,next){
          console.log(req.role);
            if(roles.includes(req.role)==true){
                  next();
            }
            else{
                  res.status(401).json({
                        message:"operation not allowed"
                  })
            }
      }
}

//protectRoute

// module.exports.ProtectRoute= async function ProtectRoute(req, res, next){
// console.log(req.body);
//      try{ 
//           let token;
//       if(req.cookies.isLogin){
//             console.log(req.cookies);
            

//             token=req.cookies.isLogin;
//             let payload=jwt.verify(token,JWT_KEY); 
           
//            if(payload){
//                   console.log('payload token',payload);
//                   const user=await userModel.findById(payload.payload);
//                   req.role=user.role;
//                   req.body=user.id;
//                   console.log(req.role);
//                   console.log(req.body);
                 
//                   next();
//             }
//             else{
//                   return res.json({
//                         message:'please login again'
//                   })
//             }
//       }
//       else{
//             //browser
//           const client=req.get('User-Agent');
//           if(client.includes("Mozilla")==true){
//             return res.redirect('/login');
//           }
//            //postman
//             res.json({
//                 message:"please login"
//             })
//       }
// }
//       catch(err){
//             return res.json({
//                   message:err.message
//             })
            
//       }
// }
module.exports.ProtectRoute= async function ProtectRoute(req, res, next){
      try {
            let token;
            if (req.cookies.login) {
              console.log(req.cookies);
              token = req.cookies.login;
              let payload = jwt.verify(token, JWT_KEY);
              if (payload) {
                console.log("payload token", payload);
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;
                console.log(req.role, req.id);
                next();
              } else {
                return res.json({
                  message: "please login again",
                });
              }
            } else {
              //browser
              const client=req.get('User-Agent');
              if(client.includes("Mozilla")==true){
                return res.redirect('/login');
              }
              //postman
              res.json({
                message: "please login",
              });
            }
          } catch (err) {
            return res.json({
              message: err.message,
            });
          }
}

//forgetPassword
module.exports.forgetpassword= async function forgetpassword(req,res){
      let{emailv}=req.body;
      try{ 
           const user=await userModel.findOne({email:emailv}); 
           if(user){
            //createResetToken is used to create new token
            const resetToken=user.createResetToken();
            let resetpasswordLink=`${req.protocol}://${req.get.host}/resetpassword/${resetToken}`
            //send email to the user;
            //nodemailer
           } 
           else{
            return res.json({
                  message:"please signup"
            });
           }
      }
      catch(err){
            return  res.status(500).json({
                  message:err.message
            });
      }
}


//resetPassword
module.exports.resetpassword= async function resetpassword(req,res){
      try{
      const token=req.parmas.token;
      let{password,confirmPassword}=req.body;
      const user=await userModel.findOne({resetToken:token});
      //rsetpasswordhandler update user password in db
      if(user){
           user.resetPasswordHandler(password,confirmPassword);
      await user.save();
      res.json({
            message:"password changed succesfully"

      })  
      }
      else{
            res.json({
                  message:"user not found"
            });  
      }
     
    }
    catch(err){
      res.json({
            message:err.message
      });
    }
}


module.exports.logout=function logout(req,res){
      res.cookie('isLogin',' ',{maxAge:1});
      res.json({
            message:"user logged out succesfully"
      })
}
