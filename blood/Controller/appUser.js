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

export  async function  userRegistation(req, res) {
  console.log(req.body)
  const file = req.file

  const oldUser = await User.findOne({
    phone: req.body.phone
  })
  if (oldUser) {
    return res.status(400).json({
      message: "User already exists"
    });

  }

  try {

    const img = await cloudinary.v2.uploader.upload(file.path, {
      folder: "appUser",
    });
    console.log(req.body.password)
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const findSandhani = await Sandhani.findOne({
      address: req.body.district
    })
    const newUser = await User.create({
      name: req.body.name,
      img: img.secure_url,
      phone: req.body.phone,
      bloodGroup: req.body.bloodGroup,
      age: req.body.age,
      address: req.body.address,
      district: req.body.district,
      upazila: req.body.upazila,
      password: hashPassword,
      isDonted: false,

      sandhani: findSandhani
    });

    const updateSandani = await Sandhani.updateOne({
      address: req.body.district
    }, {

      $push: {
        register: newUser._id
      }

    })
    console.log(newUser)
    const token = await jwt.sign({
      userName: newUser.name,
      userId: newUser._id
    }, "appUser")

    res.status(200).json({
      token, success: true
    })
  }catch(e) {
    res.status(400).json({
      mss: "error"
    })
  }
}
export  async function userLogin(req, res) {

  try {

    const isUser = await User.findOne({
      phone: req.body.phone
    })

    if (isUser) {
      console.log(req.body.password)
      console.log(typeof isUser.password)
      const isValidPassword = await bcrypt.compare(req.body.password, isUser.password)


      if (isValidPassword) {
        const token = await jwt.sign({
          userName: isUser.name,
          userId: isUser._id
        }, "appUser")
        res.status(200).json(token)

      } else {
        res.status(400).json({
          error: "Authentication failed"
        })
      }
    } else {
      res.status(400).json({
        error: "Authentication failed"
      })
    }
  } catch (e) {
    res.status(400).json({
      error: "Authentication failed"
    })
  }
}
export async function userSelectedSandhani(req, res) {
  console.log(req);
  try {
    const decoded = jwt.verify(req.body.token, "appUser");

    const {
      userName,
      userId
    } = decoded;
    const findUser = await User.findOne({
      _id: userId
    });
    if (findUser) {
      const getSandhani = await Sandhani.updateOne({
        _id: req.body.id
      }, {
        $push: {
          register: findUser._id
        }
      });
      console.log(getSandhani)
      if (getSandhani.acknowledged) {
        const upDateUser = await User.updateOne({
          _id: userId
        }, {

          sandhani: req.body.id
        }
        );

        console.log(upDateUser)
        res.status(200).json(upDateUser)

      }
    } else {
      res.status(400).json({
        mss: "error"
      })
    }



  } catch (e) {
    res.status(400).json(e)

  }
}
export  async function searchByUser(req, res) {
  try {


    const {
      blood,
      district
    } = req.body;
    const getSandhani = await Sandhani.find({
      $text: {
        $search: district
      }}).populate({
      path: "blood", match: {
        groupName: blood
      }})
   const totalRes=await User.countDocuments({bloodGroup:blood,sandhani:getSandhani});
   
    res.status(200).json({sandhani:getSandhani[0],reg:totalRes});
  } catch (e) {
    res.status(400).json(e)
  }

}

export async function getAlluser(req, res) {
  try {

    const {
      blood,
      offset,
      limit
    } = req.query;
    console.log("user  "+blood+" ")
    if (blood != undefined) {
      const count = await User.countDocuments({
        bloodGroup: blood
      });
      if(count==0){
        res.status(200).json({data:-1});
        
      }else{
    
        if (parseInt(offset) >= count) {
          res.status(200).json({
            data: 0
          });
        } else {
          console.log("data")

          const data = await User.find({
            bloodGroup: blood
          }).skip(parseInt(offset)).limit(parseInt(limit));
          console.log(data)
          res.status(200).json(data);
        }}
      }
      else {
        res.status(200).json({
          data: 1
        })
      }
      
    
  
  } catch (e) {
    res.status(400).json({
      mss: "some error in fetching"
    })
  }
}
export async function userDetails(req, res) {
  try {

    const data = await User.findOne({
      _id: req.userId
    }).populate("sandhani");
    res.status(200).json(data)
  } catch (e) {}
}