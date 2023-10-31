import Manager from './manager.js';
import message from '../models/message.js';

class chatManager extends Manager {
  constructor() {
    super(message);
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

export default new chatManager();
