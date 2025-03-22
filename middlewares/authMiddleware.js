import jwt from "jsonwebtoken";
import {createError,errorResponseUnAuthorize} from "../utils/responseUtils.js";

const verifyToken = async (req,res,next)=>{

    const authorization = req.header("Authorization");

    if(authorization == null){
        next();
        return;
    }

    if(!authorization.startsWith("Bearer ")){
        return res.send(errorResponseUnAuthorize());
    }

    const token = authorization.substr(7);

    //verify token
    try{

        const secretKey = process.env.JWT_SECRET_KEY;
        const decoded = jwt.verify(token,secretKey);

        const currentUser = {
            user_id: decoded.user_id
            
        };
    
        req.current_user = currentUser;
        next();
        console.log(currentUser)

    }catch(error){
        if(error instanceof jwt.TokenExpiredError){
            return res.send(createError("ACCESS_TOKEN_EXPIRED", "Your token has expired."));
        }else{
            return res.send(errorResponseUnAuthorize());
        }
    }

}

export default verifyToken;