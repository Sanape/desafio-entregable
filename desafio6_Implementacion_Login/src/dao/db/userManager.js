import usersModel from '../models/user.model.js';
import Manager from './Manager.js';

class UserManager extends Manager {
  constructor() {
    super(usersModel);
  }

  async create(object) {
    try {
      const foundUser = await this.getByFilter({ email: object.email });

      if (foundUser) {
        throw new Error('User already exists');
      }

      return super.create(object);
    } catch (error) {
      throw error;
    }
  }
}

export default new UserManager();
