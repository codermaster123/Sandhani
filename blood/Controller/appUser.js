import jwt from "jsonwebtoken";
import User from "../Model/userModel.js";
import bcrypt from "bcryptjs";
import Sandhani from "../Model/Sandhani.js";
import cloudinary from "cloudinary";
cloudinary.v2.config({
  cloud_name: "dl0rkcikg",
  api_key: "575145596914325",
  api_secret: "KD3c9quklAcigLhr0hC2EPpq7wI",
});

export  async function  userRegistation(req,res) {
   
   const file=req.file
   console.log(file)
   const oldUser=await User.findOne({phone:req.body.phone})
  if(oldUser){
     return res.status(400).json({
      message: "User already exists"
    });
    
  }
  
   try{
       
     const img = await cloudinary.v2.uploader.upload(file.path, {
      folder: "appUser",
    });
    const hashPassword=await bcrypt.hash(req.body.password,10);
    const newUser=await User.create({
      name:req.body.name,
      img:img.secure_url,
      phone:req.body.phone,
      bloodGroup:req.body.bloodGroup,
      address:req.body.address,
      password:hashPassword
    });
    console.log(newUser)
      const token=await jwt.sign({
    	userName:newUser.name,
    	userId:newUser._id
    },"appUser")
     
    res.status(200).json({token,success:true})
  }catch(e){
    res.status(400).json({mss:"error"})
  }
}
export  async function userLogin(req,res) {
	try {
		const isUser=await User.findOne({phone:req.body.phone})
	 if(isUser){
	 	const isValidPassword=await bcrypt.compare(req.body.password,isUser.password)
	 	if(isValidPassword){
	 		const token=await jwt.sign({
     	userName:isUser.name,
     	userId:isUser._id
     },"appUser")
     res.status(200).json(token)
     
	 	}else{
	 		res.status(400).json({error:"Authentication failed"})
	 	}
	 }else{
	 		res.status(400).json({error:"Authentication failed"})
	 }
	} catch (e) {
			res.status(400).json({error:"Authentication failed"})
	}
}
export async function userSelectedSandhani(req,res){
    try {
         const decoded=jwt.verify(req.body.token, "appUser");
         
         const {userName,userId}=decoded;
         const findUser=await User.findOne({_id:userId});
         if(findUser){
         const getSandhani=await Sandhani.updateOne({_id:req.body.id},{
           $push:{
             register:findUser._id
           }
         });
         if(getSandhani.acknowledged){
         const upDateUser=await User.updateOne({_id:userId},{
          
            sandhani:getSandhani.req.body.id
          }
        );
        
        console.log(upDateUser)
        res.status(200).json(upDateUser)
        
         }
         }else{
             res.status(400).json({mss:"error"})
         }
         
        
        
    } catch (e) {
           res.status(400).json(e)
        
    }
}
export  async function searchByUser(req,res){
    const {blood,area}=req.body;
    
    
    const getSandhani=await Sandhani.find({address:area}).populate("blood");
    
    const allBlood=[];
    for(let i=0;i<getSandhani.length;i++){
      
      allBlood.push(getSandhani[i].blood)
    }
    
    res.status(200).json(allBlood);
    
    
    
    
}