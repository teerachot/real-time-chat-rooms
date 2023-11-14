import mongoose from 'mongoose'

const UserSchema =mongoose.Schema({
    name: {
		type: String,
		require: true
	},
	email: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	avatar: {
		type: String,
		require: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	isLogin:{
		type: Date,
		default: Date.now
	}
})

const User = mongoose.model("users", UserSchema)

export default User