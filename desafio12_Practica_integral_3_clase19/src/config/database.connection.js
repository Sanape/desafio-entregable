import { Sequelize } from 'sequelize';
import { errors } from '../utils/errorDictionary.js';

export class Database {
  static instanceDatabase;

  static getInstanceDatabase(database = Sequelize) {
    if (!this.instanceDatabase) {
      this.instanceDatabase = new database(process.env.DB_URI);
    }

    return this.instanceDatabase;
  }

  static async databaseConnection() {
    try {
      await this.getInstanceDatabase().authenticate();
      //await this.getInstanceDatabase().sync({alter:true});
      console.log('Succesfully connected to database');
    } catch (error) {
      throw new errors.DATABASE_CONNECTION_FAILED(error.message);
    }
  }
}
