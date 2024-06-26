import express, { Application } from 'express';
import cors from 'cors';
import session from 'express-session';

// Routes
import contactRoutes from './routes/contacts.route';
import profileRoutes from './routes/profile.route';
import authRoutes from './routes/auth.route';

import config from './config/env';
import { errorHandler, notFoundHandler } from './middleware';

const MongoDBStore = require('connect-mongodb-session')(session);
const app: Application = express();
const PORT = config.port;
const isProduction = process.env.NODE_ENV === 'production';
const prefix = isProduction ? '/address-book' : '';

const store = new MongoDBStore({
  uri: config.mongoose.url,
  collection: config.session.collectionName
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configure CORS
app.use(
  cors({
    credentials: true,
    // TODO: Update production origin url
    origin: isProduction ? '*' : 'http://localhost:3000',
    optionsSuccessStatus: 200
  })
);

app.set('trust proxy', true);
// Configure session
app.use(
  session({
    name: config.session.name,
    secret: config.session.secret as string,
    cookie: {
      httpOnly: isProduction,
      secure: isProduction,
      maxAge: +config.session.cookie.expiration
    },
    store,
    resave: false,
    saveUninitialized: false
  })
);

// Routes
app.use(`${prefix}/api/auth`, authRoutes);
app.use(`${prefix}/api/contacts`, contactRoutes);
app.use(`${prefix}/api/profile`, profileRoutes);

// Error middlewares
app.use(notFoundHandler);
app.use(errorHandler);

process.on('unhandledRejection', (error) =>
  console.warn('Unhandled Rejection', error)
);

process.on('uncaughtException', (error) =>
  console.warn('Uncaught Exception', error)
);

app.on('error', (error: any) => {
  switch (error.code) {
    case 'EACCES':
      console.error(`${PORT} requires elevated privileges`);
      break;

    case 'EADDRINUSE':
      console.error(`${PORT} is already in use.`);
      break;

    default:
      throw error;
  }
});

export default app;
