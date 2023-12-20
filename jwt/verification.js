import jwt  from "jsonwebtoken";
import {VERIFICATION_TOKEN} from '../config.json'

const verifyToken = (req, res, next)=>{
    const authHeader = req.headers.access_token
    // if(authHeader)
}