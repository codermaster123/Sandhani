import jwt from "jsonwebtoken"

export function checkLogin(req,res,next) {
  let key=["appUser","cmckcmc"]
   const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, "cmckcmc");
        const { username, userId } = decoded;
        req.username = username;
        req.userId = userId;
        next();
    } catch(err) {
        next("Authentication failure!");
    }
    
}

