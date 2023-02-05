import mongoose from "mongoose";


const BloodSchema = new mongoose.Schema({
   groupName:{
    type:String,
    required:true
    
  },
  amount:{
     type:String,
    required:true
    
  },
  sandhani:{
    type:mongoose.Types.ObjectId,
    ref:"sandhani"
  }
  
  
  
});


const blood= mongoose.model('Blood', BloodSchema);

export default blood;


