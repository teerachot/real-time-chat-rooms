const mongooes = require("mongoose")

const Schema = mongooes.Schema


const MessageSchema = new Schema({
    message:{ 
        type: String,
		required: true
    },
    room:{
        type: String,  // type: Schema.Types.ObjectId,
		required: true // ref: "rooms"
    } ,
	username: {
		type: String,  // type: Schema.Types.ObjectId,
		required: true   // ref: "users"
	},
    createdTime: {
        type: Date,
        default: Date.now
    }
})

const message = mongooes.model("message", MessageSchema)

export default message
