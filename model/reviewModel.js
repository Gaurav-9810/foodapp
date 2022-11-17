//mongoose ke throught connect mongodb


const mongoose=require('mongoose');
const db_link='mongodb+srv://gaurav:gauravgan444@cluster0.pqu3fba.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
      // console.log(db);
      console.log('review db connected');
})
.catch(function(err){
      console.log(err);
})

const reviewSchema= new mongoose.Schema({
      review:{
            type:String,
            required:[true, 'review is required']
      },
      rating:{
          type:Number,
          min:1,
          max:10,
          required:[true,'rating is required']
      },
      createdAt:{
            type:Date,
            default:Date.now()
      },
      user:{
           type:mongoose.Schema.ObjectId,
           ref:'userModel',
           required:[true,'review must belong to a user']

      }
      ,
      plan:{
            type:mongoose.Schema.ObjectId,
            ref:'planModel',
            required:[true,'review must belong to a plan']
 
       }
});
//find findByID ,findOne
//when ever find function run then this will happen before running find
reviewSchema.pre(/^find/,function(next){
      this.populate({
            path:"user",
            select:"name profileImage"
      }).populate("plan");
      next();
})



//model
const reviewModel=mongoose.model('reviewModel',reviewSchema);


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



module.exports=reviewModel;