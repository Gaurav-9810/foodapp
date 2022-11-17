
const jwt=require('jsonwebtoken');
const JWT_KEY='jdshfkjbdfkjbd';

function ProtectRoute(req,res,next){
      // console.log(req.cookies.isLoggedIn);
      if(req.cookies.isLogin){
            let isVerified=jwt.verify(res.cookies.login,JWT_KEY); 
            if(isVerified){
                  next();
            }
            else{
                  return res.json({
                        message:'user not verified'
                  })
            }
      }
      else{
            return res.json({
                  message:' operation not allow'
            })
            
      }
}

module.exports=ProtectRoute;