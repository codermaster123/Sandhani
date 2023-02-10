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
  age:{
      type:String,
      required:true     
  },
  address:{
    type:String,
    required:true
    
  },
  district:{
    type:String,
    required:true
  },
  upazila:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  isDonted:{
    type:Boolean,
    required:true
  },
  donateDate:{
     type:Date,
     required:false

  },
  sandhani:{
    type:mongoose.Types.ObjectId,
    ref:"sandhani"
  }
  
  
});


const User= mongoose.model('User', UserSchema);

export default User;


