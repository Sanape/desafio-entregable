import BaseService from "./base.service.js";
import RatingDao from "../dao/DBSystem/Rating.dao.js";
import { Op } from "sequelize";

class RatingService extends BaseService {
  constructor() {
    super(RatingDao);
  }

  async create(object) {
    try {
      let rating = await this.getByFilter({
        userId: object.userId,
      });

      if (rating) {
        rating = await this.updateById(rating.id, object);
      } else {
        rating = await super.create(object);
      }
    } catch (error) {
      throw error;
    }
  }

  async getRecentRatings() {
    try {
      const actualDate = new Date();
      const week = 1000 * 60 * 60 * 24 * 7;
      const lastWeek = new Date(actualDate.getTime() - week);

      const result = await this.getAll({
        where: {
          createdAt: {
            [Op.lt]: actualDate,
            [Op.gt]: lastWeek,
          },
        },
        limit: 10,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new RatingService();
