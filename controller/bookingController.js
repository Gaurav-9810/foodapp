// This is your test secret API key.
let Sk="sk_test_51M58V2SFkQ7dTOcvjQOwApg5oFx3QQJfClIdKnUH9K60N1hkPwb86ZqnMAPG3Mllsk5e0NdNe0K46UEcWffiSPLl00M1v5UAhb";

const stripe = require('stripe')(Sk);
const planModel=require('../model/planModel.js');
const userModel=require('../model/UserModel.js');


module.exports.createSession=async function createSession(req , res){
  console.log(req.body);
      try{
      let userId=req.id;
      let planId=req.params.id;
  
      const user = await userModel.findById(userId);
      const plan = await planModel.findById(planId);
  
      const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          customer_email: user.email,
          client_refernce_id: plan.id,
          line_items: [
            {
              name: plan.name,
              description: plan.description,
              // deploy website 
              amount: plan.price * 100,
              currency: "inr",
              quantity: 1
            }
          ],
          // dev => http
          // production => https 
          success_url: `${req.protocol}://${req.get("/")}/profile`,
          cancel_url: `${req.protocol}://${req.get("/")}/profile`
        })
        res.status(200).json({
          status: "success",
          session
        })
      } catch (err) {
        res.status(500).json({
          err: err.message
        })
      }
  }