const userModel=require('../model/UserModel.js');


// function setCookies(req,res){
//       res.cookie('isLoggedIn',false,{maxAge:1000*60*60*24, secure:true , httpOnly : true});
//       res.send('cookies has been set ');
// }


module.exports.getUser= async function getUser(req,res){
      let id=req.params.id;
      let user=await userModel.findById(id);
      if(user){
            return res.json(user);
      }
      else{
          res.json({
            message:'user not found',
            
      });  
      }
      

}

// module.exports.postUser=function postUser(req,res){
//       console.log(req.body);
//       users=req.body;
//       res.json({
//             message:"data received successfully",
//             user:req.body
//       });
// };

module.exports.updateUser=async function updateUser(req,res){
      console.log('req.body->',req.body);
      //update data in users obj

     try{ 
            let id=req.params.id;
            let user=await userModel.findById(id);
            let dataToBeUpdated=req.body;
           
            if(user){
                  const keys=[];
                  for(let key in dataToBeUpdated){//key:value pair
                        keys.push(key);
                  }

                  for(let i=0;i<keys.length;i++){
                        user[keys[i]]=dataToBeUpdated[keys[i]];
                  }
                  let updatedData=await user.save();
                  res.json({
                        message:"data updated successfully"
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
                  message:err
            })
           
     }
      
      
}
module.exports.deleteUser=async function deleteUser(req,res){
      // users={};
      try{
            let id=req.params.id;
            let user=await userModel.findByIdAndDelete(id);
            if(!user){
                  res.json({
                        message:"user not found"
                  })
            }
      
            res.json({
                  message:"data has been deleted",
                  data:user
            });   
      }
      catch(err){
            res.json({
                  message:err
            })
      }
}

module.exports.getAllUser=async function getAllUser(req,res){
      let users=await userModel.find();
try{
      if(users){
            res.json({
                  message:'users retrieved',
                  data:users
            });
      }
      else{
            res.json({
                  message:"No user data"
            })
      }
      res.send("users id received");
}
 catch(err){
      res.json({
            message:err
      })
 }    
}

module.exports.updateProfileImage=function updateProfileImage(req,res){
     res.json({
      message:"file uploaded succesfully"
     }) 
}