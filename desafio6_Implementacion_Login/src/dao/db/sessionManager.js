import UserManager from "./UserManager.js";

class SessionManager extends UserManager {
  async login(email, password) {
    try {
      const foundUser = await this.getByFilter({ email: email });

      if (!foundUser) {
        throw new Error("User doesn't exists");
      }

      if (foundUser.password !== password) {
        throw new Error("Invalid password");
      }

      return foundUser;
    } catch (error) {
      throw error;
    }
  }
}

export default new SessionManager();