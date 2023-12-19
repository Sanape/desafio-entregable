import Manager from './manager.js';
import messagesModel from '../models/message.model.js';

class ChatManager extends Manager {
  constructor() {
    super(messagesModel);
  }

  async deleteAll(filter) {
    try {
      const deletedObjects = await this.model.deleteMany(filter);

      return deletedObjects;
    } catch (error) {
      throw error;
    }
  }
}

export default new ChatManager();
