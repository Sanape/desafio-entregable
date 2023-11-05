//Imports
import express from 'express';
import productsRoute from './routes/products.router.js';
import cartsRoute from './routes/carts.router.js';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';
import 'dotenv/config';
import morgan from 'morgan';
import viewsRoute from './routes/views.router.js';
import { engine } from 'express-handlebars';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
import { getAllProductsHandler, messagesHandler } from './handlers/handlers.js';
//Conexion a la bd
import databaseConnection from './config/databaseConnection.js';
//desafio: Implementacion Login
import sessionRoute from './routes/sessions.router.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo';
//refactor
import userRoute from './routes/user.router.js';
import passport from 'passport';

//Variables
const app = express();

//Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 15,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/api/carts', cartRoute);
app.use('/api/products', productRoute);
app.use('/api/sessions', sessionRoute);
app.use('/api/users', userRoute);
app.use('/', viewsRoute);

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

socketServer.on('connection', onConnection);
