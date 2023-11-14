import RealtimeChatApp from "../model/RealtimeChatApp"



const saveMessage = async ( { message, username, room, createdTime }) =>{
    try {
         let newMessage = new RealtimeChatApp( { message:message, username:username, room:room, date:createdTime })
         await newMessage.save()
    } catch (error) {
        console.log(error)
    }
}


const getMessage = async (room) =>{
    try{
        let result = RealtimeChatApp.find({'room':room}).exec()
        return result
    }catch(error){
        console.log("error getMessage: ",error)
    }
}



export {saveMessage,getMessage}