import jwt from "jsonwebtoken";
import User from "../Model/userModel.js";
import bcrypt from "bcryptjs";

export  async function  userRegistation(req,res) {
   
   const oldUser=await User.findOne({phone:req.body.phone})
   if(oldUser){
     res.status(400).json({mss:"you have already login",success:true})
   }
   else{
     const hashPassword=await bcrypt.hash(req.body.password,10);
     const newUser=await User.create({
       name:req.body.name,
       phone:req.body.phone,
       bloodGroup:req.body.bloodGroup,
       address:req.body.address,
       password:hashPassword
     });
     const token=await jwt.sign({
     	userName:newUser.name,
     	userId:newUser._id
     },"appUser")
     
     res.status(200).json({newUser,success:true})
   }
   
}
export default async function userLogin(req,res) {
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