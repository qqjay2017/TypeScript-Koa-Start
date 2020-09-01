import Koa, { ParameterizedContext, Next } from 'koa';

import helmet from "koa-helmet";
import cors from "@koa/cors";

import { logger } from "./logger";
import winston from "winston";

import { cron } from "./cron";
import bodyParser from "koa-bodyparser";

import {unprotectedRouter} from './unprotectedRoutes';
// import  logger from 'koa-logger';
// import mongoose from "mongoose";
// import bluebird from "bluebird";

import dotenv from 'dotenv';
import Router from '@koa/router';
import compress  from 'koa-compress';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });



// Create Koa server
const app = new Koa();

// Connect to MongoDB

// mongoose.Promise = bluebird;
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
//   () => { 
//     console.log('mongodb连接成功')
//     /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
// ).catch(err => {
//   console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
//   // process.exit();
// });


// Provides important security headers to make your app more secure
app.use(helmet());

 // Enable cors with default options
 app.use(cors());


// Logger middleware -> use winston as logger (logging.ts with config)
app.use(logger(winston));

app.use(bodyParser());

app.use(unprotectedRouter.routes);

 // Register cron job to do any action needed
 cron.start();



// look ma, error propagation!

app.use(async (ctx: ParameterizedContext, next:Next) => {
  try {
    await next();
  } catch (err) {
    // some errors will have .status
    // however this is not a guarantee

    
    ctx.status = err.status || 500;
    ctx.body = {
      code:err.status ||500,
      result:err.message,
      msg:'服务端异常'
    };

    // since we handled this manually we'll
    // want to delegate to the regular app
    // level error handling as well so that
    // centralized still functions correctly.
    ctx.app.emit('error', err, ctx);
  }
});


// error handler

app.on('error', function (err) {
  if (process.env.NODE_ENV != 'development') {
    console.log('sent error %s to the cloud', err.message);
    console.log(err);
  }
});

const router = new Router();




app.use(router.routes());
app.use(router.allowedMethods());




export default app;

