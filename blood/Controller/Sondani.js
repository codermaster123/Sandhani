import TestModel from "../Model/test.js";
import User from "../Model/SandhaniUser.js";
import Blood from "../Model/Blood.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Sandhani from "../Model/Sandhani.js";
import cloudinary from "cloudinary";
cloudinary.v2.config({
  cloud_name: "dl0rkcikg",
  api_key: "575145596914325",
  api_secret: "KD3c9quklAcigLhr0hC2EPpq7wI",
});

export async function imgHamdler(req, res) {
  const file = req.file;
  console.log(file);
  try {
    const img = await cloudinary.v2.uploader.upload(file.path, {
      folder: "test",
    });
    console.log(img);
    //res.status(201).json({s:true})

    // cloudinary.v2.uploader.upload(file.path,{ folder:"test"},(err,result)=>{
    //     console.log(result)
    //     res.status(201).json({s:true})

    // })
  } catch (error) {
    res.status(400).send(error.message);
  }

  // res.status(201).json({su:true})
}

export async function registerUser(req, res) {
  const oldUser = await User.findOne({ email: req.body.email });
  if (oldUser) {
    return res.status(400).json({ message: "User already exists" });
  } else {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    });
    return res.status(200).json(newUser);
  }
}

export async function Login(req, res) {
  const user= await User.find({ name: req.body.name });
  
  if (user) {
    const isValidPass = await bcrypt.compare(
      req.body.password,
      user[0].password
    );
    if (isValidPass) {
      const token = await jwt.sign(
        {
          userName: user[0].name,
          userId: user[0]._id,
        },
        "cmckcmc"
      );
      res.status(200).json(token);
    } else {
      res.status(400).json({ error: "Authentication failed" });
    }
  } else {
    res.status(400).json({ error: "AuthenticationU failed" });
  }
}
export async function AddSandhani(req, res) {
  const user=await User.findOne({_id:req.userId});
  if(user.sandhani){
    return res.status(400).json({mss:"you have a sandhani already",success:false})
  }
  
  
  const file = req.file;
  const { name, email, address, amount } = req.body;
  console.log(req.body)
  console.log(req.userId)

  try {
    const img = await cloudinary.v2.uploader.upload(file.path, {
      folder: "sandhani",
    });
    
    const newSandhani = await Sandhani.create({
      name: name,
      email: email,
      address: address,
        amount: amount,
      imageUrl: img.secure_url,
    });
    console.log(newSandhani)
    
    const updateUser = await User.updateOne(
      { _id: req.userId },
      {
        sandhani: newSandhani,
      }
    );
    
    res.status(200).json({newSandhani,success:true});
  } catch (e) {
    res.status(400).json({ mss: e });
  }
  
  
  
}
export async function AddBloodDetails(req, res) {
  try {
    const addBloodDetails = await Blood.insertMany({
      name: req.body.name,
      amount: req.body.amount,
    });
    const updateSandhani = await Sandhani.updateMany(
      { _id: req.body.sId },
      {
        $push: {
          blood: addBloodDetails,
        },
      }
    );
    res.status(200).json({ sucess: true });
  } catch (e) {
    res.status(400).json({ error: "faild operations" });
  }
}
export async function getBloodDetails(req, res) {
	try {
	  
		const data=await Sandhani.findOne({_id:req.params.id}).populate("blood");
		
		// console.log(data)
	  
	 res.status(200).json({bloodData:data.blood,sucess:true})
	 
	} catch (e) {
		res.status(400).json({sucess:false})
	}

}
export async function addSingleBloodDetail(req,res){
  try {
    const addBlood=await Blood.create({
    groupName:req.body.name,
    amount:req.body.amount
  })
  // const sandhani=await Sandhani.findOne({_id:req.body.sId});
  // console.log(sandhani)
  
  const updateSandhani=await Sandhani.updateOne({_id:req.body.sId},{
    $push:{
      blood:addBlood._id
    }
    
  })
  console.log(updateSandhani)
  res.status(200).json({updateSandhani,sucess:true})
  
  } catch (e) {
      res.status(400).json({sucess:false});
      
    
  }
  
}
export async function getSandhani(req,res) {
  try {
    
      const Sandhani=await User.findOne({_id:req.userId}).populate("sandhani");
      res.status(200).json(Sandhani);
      
    
  } catch (e) {
      res.status(400).json({sucess:false});
  }
}


export async function getAllSandhani(req,res) {
  try {
    const allSandhani=await Sandhani.find({});
     res.status(200).json(allSandhani)
  } catch (e) {
    
      res.status(400).json({sucess:false})
  }
     
}
export async function getSandhaniBySearch(req,res) {
  
  const {q}=req.query
  if(q=="" || q==" "){
    return res.status(200).json(null)
  }
  try {
    const result=await Sandhani.find({name:{$regex:new RegExp(q),$options:"i"}})
  
     res.status(200).json(result)
    
  } catch (e) {
     res.status(400).json({mss:e})
  }
  
}
