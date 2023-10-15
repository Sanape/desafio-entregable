import Manager from "./Manager.js";
import message from "../models/message.js"

class MessageManager extends Manager{
    constructor(){
        super(message)
    }
}

export default new MessageManager();