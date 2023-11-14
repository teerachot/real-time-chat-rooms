const mongooes = require("mongoose")

const Schema = mongooes.Schema

const RoomSchema = new Schema({
	username: {
		type: String // type: Schema.Types.ObjectId,
		             //ref: "users"
	},
	name: {
		type: String
	},
    date: {
        type: Date,
        default: Date.now
    }
})

const ChatRoom = mongooes.model("rooms", RoomSchema)

export default ChatRoom



