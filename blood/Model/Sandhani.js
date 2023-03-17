import mongoose from "mongoose";


const SandhaniSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    
  },
  address:{
    type:String,
    required:true
    
  },
  amount:{
    type:String,
    required:true
    
  },
  imageUrl:{
    type:String,
    required:true
    
  },
  blood:[
    {
      type:mongoose.Types.ObjectId,
      ref:"Blood"
    }
],
  register:[
    {
      type:mongoose.Types.ObjectId,
      ref:"User"
    }
],


});

SandhaniSchema.index({ address:"text"  }); // create index on 'name' field


const user= mongoose.model('sandhani', SandhaniSchema);

export default user;


