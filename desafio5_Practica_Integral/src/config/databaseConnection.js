//imports
import mongoose from "mongoose";

//config
mongoose.set("strictQuery", true);

//methods
/**
 * Establish connection with database with uri as enviroment variable DATABASE_URI
 * @throws {Error} - If cannot connects with database throws an error.
 */
async function databaseConnection() {
  await mongoose
    .connect(process.env.DB_URI)
    .then((res) => {
      console.log("Succesfully connected to database");
    })
    .catch((err) => {
      throw new Error(`Connection to database failed, ERROR: ${err.message}`);
    });
}

//exports
export default databaseConnection;
