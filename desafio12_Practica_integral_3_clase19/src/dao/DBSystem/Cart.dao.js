import BaseDao from "./Base.dao.js";
import {Cart} from "../../models/cart.js";

class CartDao extends BaseDao {
  constructor() {
    super(Cart);
  }
}

export default new CartDao();
