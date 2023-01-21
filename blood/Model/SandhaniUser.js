import mongoose from "mongoose";


const SandhaniUserSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    
  },
  password:{
    type:String,
    required:true
  },
  sandhani:{
    type:mongoose.Types.ObjectId,
    ref:"sandhani"
  }
  
});


const sandhaniUser= mongoose.model('sandhaniUser', SandhaniUserSchema);

export default sandhaniUser;


