import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  img:{
    type:String,
    required:true
  },
  phone:{
    type:String,
    required:true
  },
  bloodGroup:{
    type:String,
    required:true
  },
  
  address:{
    type:String,
    required:true
    
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


const User= mongoose.model('User', UserSchema);

export default User;


