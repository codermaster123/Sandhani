import multer from "multer";
import express,{Router} from "express";


import {checkLogin} from "../MiddleWare/CheckLogin.js";
// import {translator} from "../MiddleWare/translator.js"
import  {updateBlood,getSandhaniBySearch,getAllSandhani,imgHamdler,registerUser,Login,AddSandhani,addSingleBloodDetail,getBloodDetails,getSandhani}  from "../Controller/Sondani.js"

import {userRegistation,searchByUser,userSelectedSandhani} from "../Controller/appUser.js"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' 
        || file.mimetype === 'image/jpeg'){
            cb(null, true);
        }else {
            cb(null, false);
        }
}

const upload = multer({storage: storage, fileFilter: filefilter});

const route = express.Router();

route.post("/uploads",upload.single("test"),imgHamdler);
route.post("/register",registerUser);
route.post("/login",Login);
route.post("/AddSandhani",checkLogin,upload.single("Sandhani"),AddSandhani);
route.post("/Addblood",checkLogin,addSingleBloodDetail);
route.get("/getblood/:id",getBloodDetails);
route.get("/Sandhani",checkLogin,getSandhani);
route.get("/getAllSandhani",getAllSandhani);
route.get("/search",getSandhaniBySearch);
route.post("/addDonar",upload.single("User"),userRegistation)
route.post("/searchByUser",searchByUser)
route.put("/updateBlood/:id",checkLogin,updateBlood)
route.post("/userUpdate",userSelectedSandhani)


export default route;