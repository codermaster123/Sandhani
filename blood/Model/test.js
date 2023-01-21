import mongoose from "mongoose";


const TestSchema = new mongoose.Schema({
  name: String,
  img:{
     type:String
  }
  
});


const test = mongoose.model('testImage', TestSchema);

export default test;


