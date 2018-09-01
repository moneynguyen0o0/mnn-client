import path from 'path';
import express from 'express';
import cors from 'cors';
import compress from 'compression';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import cookiesMiddleware from 'universal-cookie-express';

import renderLayout from './middlewares/renderLayout';
import { notFound, handleErrors } from './middlewares/errorHandler';
import { isProduction, baseURL } from './config/app';
import { PORT } from './config/env';

const app = express();

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

if (isProduction) {
  app.use(compress());
  // secure apps by setting various HTTP headers
  app.use(helmet());
}

app.use(favicon(path.resolve(process.cwd(), 'public/favicon.ico')));
app.use(express.static(path.resolve(process.cwd(), 'public'), { maxAge: 86400000 }));

// Hook cookies get/set on Express for server-rendering
app.use(cookiesMiddleware());

// render html
app.use(renderLayout());

// catch 404 and forward to error handler
app.use(notFound());

// error handler
app.use(handleErrors());

app.listen(PORT, () => {
  console.log('------------------------------------');
  console.log('===> 😎  Starting Server . . .');
  console.log(`===>  App running on ${baseURL}`);
  console.log('------------------------------------');
});
