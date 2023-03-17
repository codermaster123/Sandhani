import jwt from "jsonwebtoken"

export function checkLogin(req,res,next) {
  
   const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, "appUser");
           console.log(decoded)
      
        const { username, userId } = decoded;
        
        req.username = username;
        req.userId = userId;
        next();
    } catch(err) {
        next("Authentication failure!");
    }
    
}

