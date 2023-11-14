import mongoose from "mongoose"
import config from 'config'
const db = config.get("mongoURI")


const ConnectedDB = async () => {
	try {
		await mongoose.connect(db,{
            authSource:"admin",
            autoIndex:true
        })
		console.log("Database Connected....")
	} catch (error) {
		console.log("ERROR:", error)
		process.exit(1)
	}
}

export default ConnectedDB