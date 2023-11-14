import jwt from 'jsonwebtoken'
import config from 'config'


const auth = (req,res,next) =>{
    // Get token from header
    const token = req.header('Authorization')
    // Check id not token
    if(!token){
       return res.status(401).json({msg:"No token, authorization denied"})
    }
    
    try{
        const decoded = jwt.verify(token,config.get('JWTSecret'))
        req.user = decoded.user
        next()
    }catch(error){
        res.status(400).json({msg:"Token is not valid"})
    }
}

export default  auth
