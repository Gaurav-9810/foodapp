
const mongoose=require('mongoose');
const emailValidator=require('email-validator');
const bcrypt=require('bcrypt');
const crypto=require('crypto');


const db_link='mongodb+srv://gaurav:gauravgan444@cluster0.pqu3fba.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
      // console.log(db);
      console.log('db connected');
})
.catch(function(err){
      console.log(err);
})


const userSchema=mongoose.Schema({
      name:{
            type:String,
            required:true
      },
      email:{
            type:String,
            required:true,
            unique:true,
            validate:function(){
                  return emailValidator.validate(this.email);
            }
      },
      password:{
            type:String,
            required:true,
            minLength:8
      },
      confirmPassword:{
            type:String,
            required:true,
            minLength:8,
            validate:function(){
                 return this.confirmPassword==this.password;
            }

      },
      role:{
            type: String,
            enum:['admin','user','restaurantowner','delivery'],
            default:'user'
      },
      profileImage:{
            type:String,
            default:'img/users/default.jpeg'
      },
      resetToken:String

});

//pre post hooks 
//before save event occur in db
// userSchema.pre('save',function(){//here we can check wheather the password and confirm password is same or not if same the  save int db otherwise show error
//       console.log('before saving in db',this);
// });
// //after saving event occur in db
// userSchema.post('save',function(doc){
//       console.log('after saving in db',doc);
// });

userSchema.pre('save',function(){
      this.confirmPassword=undefined;
      //undefined data save nhi hota mongodb m
})

// userSchema.pre("save",async function(){
//       let salt=await bcrypt.genSalt();
//       let hashedString=await bcrypt.hash(this.password,salt);
//       // console.log(hashedString); 
//       this.password=hashedString;
// })

userSchema.methods.createResetToken=function(){
      //creating unique token using npm i crypto
      const resetToken=crypto.randomBytes(32).toString("hex");
      this.resetToken=resetToken;
      return resetToken;
}


userSchema.methods.resetPasswordHandler=function(password,confirmPassword){
  this.password=password;
  this.confirmPassword=confirmPassword;
  this.resetToken=undefined;
}

//model
const userModel=mongoose.model('userModel',userSchema);

module.exports=userModel;

// (async function createUser(){
//      let user={
//             name:"gangola",
//             email:"gangola@gmail.com",
//             password:"12345678",
//             confirmPassword:"12345678"
//       };

//       let data=await userModel.create(user);
//       console.log(data)

// })();