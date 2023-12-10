import BaseMongo from './base.mongo.js';
import { usersModel } from '../models/users.model.js';


class UsersMongo extends BaseMongo {
    constructor() {
        super(usersModel, "cart");
    }
    async findByEmail(email) {
        const response = await usersModel.findOne({ email: email }).populate("cart").lean();
        return response;
    }
}

export const usersMongo = new UsersMongo();