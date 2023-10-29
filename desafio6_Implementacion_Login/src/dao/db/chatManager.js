import Manager from './manager.js';
import messagesModel from '../models/message.model.js';

class ChatManager extends Manager {
  constructor() {
    super(messagesModel);
  }
}

export default new ChatManager();
