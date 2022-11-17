//mongoose ke throught connect mongodb


const mongoose=require('mongoose');
const db_link='mongodb+srv://gaurav:gauravgan444@cluster0.pqu3fba.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
      // console.log(db);
      console.log('plan db connected');
})
.catch(function(err){
      console.log(err);
})

const planSchema= new mongoose.Schema({
      name:{
            type:String,
            required:true,
            unique:true,
            maxlength:[20,'plan name should not exceed more than 20 characters ']
      },
    duration:{
      type:Number,
      required:true
    },
    price:{
      type:Number,
      required:[true,'price required']//custom error
    },
     ratings:{
      type:Number,

     },
     discount:{
      type:Number,
      validate:[function(){
            return this.discount<100
      },'discount should not exceed price']
     }

});

//model
const planModel=mongoose.model('planModel',planSchema);


// (async function createPlan(){
//       let planObj={
//             name:'SuperFood10',
//             duration:30,
//             price:1000,
//             ratings:5,
//             discount:20
//       }
//       //save plan in db
//       let data=await planModel.create(planObj); 
//       console.log(data);
// })();



module.exports=planModel;