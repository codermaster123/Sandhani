import mongoose from "mongoose";


const BloodSchema = new mongoose.Schema({
   groupName:{
    type:String,
    required:true
    
  },
  amount:{
     type:String,
    required:true
    
  }
  
  
});


const blood= mongoose.model('Blood', BloodSchema);

export default blood;


