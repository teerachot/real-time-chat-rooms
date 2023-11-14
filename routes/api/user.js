
import express from 'express'
import { check, validationResult } from 'express-validator'
import gravatar from 'gravatar'
import config from 'config'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../../model/User'
import auth from '../../middleware/auth'


const router = express.Router()

// @ router Post /api/user/
// @ desc  register api user
// @ access Public
router.post(
	"/",
	[
		check("name", "Name is reqriued")
			.not()
			.isEmpty(),
		check("email", "Email is reqriued")
			.isEmail(),
		check("password", "Password must be at least 6 charecters ")
			.isLength({min:6})
	],
	async (req, res) => {
        const error = validationResult(req)
        if(!error.isEmpty()){
           return res.status(400).json({error:error.array()})
        }else{
            const {email, name, password} = req.body
           
            try{
                 // See if user exists
                let user = await User.findOne({email})
                if(user){
                    return res.status(400).json({error:[{msg:"User already exists"}]})
                }else{
                // Get users gravatar
                    const avatar = gravatar.url(email,{s:200,r:'pg',d:'mm'})
        
                // Encrypt password
                    user = new User({name,avatar,email,password})
                    const satl = await bcrypt.genSalt(10)
                    user.password = await bcrypt.hash(password,satl)
                // save
                    await user.save()
                // send token 
                    const payload = {
                        user:{
                            id:user.id
                        }
                    }

                    jwt.sign(payload,config.get("JWTSecret"),{expiresIn:36000},(err,token)=>{
                        if(err){
                            throw err
                        }else{
                            res.json({token})
                        }
                    })
                }
            }catch(error){
                console.log("Error",error)
                res.status(400).json({error})
            }
        }
	}
)



// @ router Get /api/user/
// @ desc   get api user current
// @ access Public
router.get("/me",auth, async (req, res) => {
    try {
        const user =  await User.findById(req.user.id)
        console.log(user)
        if (!user) {
			res.status(400).json({ msg: "There is no profile for this user" })
		}
        res.json(user)

    } catch (error) {
        console.log("error", error)
        res.status(500).send("server error")
    }
})

export default router
