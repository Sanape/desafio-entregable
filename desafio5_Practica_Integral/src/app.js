//Imports
import "dotenv/config";
import express from "express";
import productRoute from "./routes/productsRoute.js";
import cartRoute from "./routes/cartRoute.js";
import viewsRoute from "./routes/viewsRoute.js";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import {
  getAllProductsHandler,
  messagesHandler,
} from "./handlers/handlers.js";
import databaseConnection from "./config/databaseConnection.js";

//Variables
const app = express();

//Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//Routes
app.use("/api/carts", cartRoute);
app.use("/api/products", productRoute);
app.use("/", viewsRoute);

//Global middlewares
app.use(errorHandlerMiddleware);

const httpServer = app.listen(8080, () => {
  console.log(`Listening on port 8080`);
  databaseConnection();
});

const socketServer = new Server(httpServer);

const onConnection = async (socket) => {
  await getAllProductsHandler(socketServer, socket);
  await messagesHandler(socketServer, socket);
};

socketServer.on("connection", onConnection);
