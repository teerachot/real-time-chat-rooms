import express from 'express'
import auth from '../../middleware/auth'
import User from '../../model/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'
import {check, validationResult} from 'express-validator'


const router = express.Router()

// @ router GET /api/auth
// @ desc   get cureent user api auth
// @ access Public
router.get("/", auth, async (req, res) => {
	try {
		let user = await User.findById(req.user.id).select("-password")
		res.json(user)
	} catch (error) {
		res.status(400).json(error)
	}
})

// @ router Post /api/auth
// @ desc  Login api user
// @ access Public
router.post(
	"/",
	[
		check("email", "Email is reqriued").isEmail(),
		check("password", "Password is invalid ").isLength({ min: 6 })
	],
	async (req, res) => {
		const error = validationResult(req)
		if (!error.isEmpty()) {
			return res.status(400).json({ error: error.array() })
		} else {
			const { email, password } = req.body
			try {
				// See if user exists
				let user = await User.findOne({ email })
				if (!user) {
					return res
						.status(400)
						.json({ error: [{ msg: "Invalid Credentials" }] })
				} else {
					const isMatch = await bcrypt.compare(password, user.password)
					if (isMatch) {
						const payload = {
							user: {
								id: user.id
							}
						}

						jwt.sign(
							payload,
							config.get("JWTSecret"),
							{ expiresIn: 36000 },
							(err, token) => {
								if (err) {
									throw err
								} else {
									res.json({ token })
								}
							}
						)
					}else{
                        return res
						.status(400)
						.json({ error: [{ msg: "Invalid Credentials" }] })
                    }
				}
			} catch (error) {
				console.log("Error", error)
				res.status(400).json({ error })
			}
		}
	}
)
export default router

