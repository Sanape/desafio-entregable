import Manager from "./Manager.js";
import user from "../models/user.js";

class UserManager extends Manager {
  constructor() {
    super(user);
  }

  async create(object) {
    try {
      const foundUser = await this.getByFilter({ email: object.email });

      if (foundUser) {
        throw new Error("User already exists");
      }

      return super.create(object);
    } catch (error) {
      throw error;
    }
  }
}

export default new UserManager();
