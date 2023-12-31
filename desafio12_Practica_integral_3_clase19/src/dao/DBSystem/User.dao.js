import { User } from "../../models/user.js";
import BaseDao from "./Base.dao.js";

class UserDao extends BaseDao {
  constructor() {
    super(User);
  }
}

export default new UserDao();
