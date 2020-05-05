
import Koa, { ParameterizedContext, Next } from 'koa';
import koaBody from 'koa-body';
import  logger from 'koa-logger'
import mongoose from "mongoose";
import bluebird from "bluebird";

const dotenv = require('dotenv');
const router = require('@koa/router')();
const compress = require('koa-compress')

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import * as apiController from "./controllers/cat";
import * as heroController from "./controllers/hero";

// Create Koa server
const app = new Koa();

// Connect to MongoDB

mongoose.Promise = bluebird;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
  () => { 
    console.log('mongodb连接成功')
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  // process.exit();
});





app.use(logger((str: any, args: any) => {
  console.log('logger', str);
  // console.log('args',args)

}));

app.use(compress({
  filter(content_type: any) {
    return /text/i.test(content_type)
  },
  threshold: 2048,
  gzip: {
    flush: require('zlib').Z_SYNC_FLUSH
  },
  deflate: {
    flush: require('zlib').Z_SYNC_FLUSH,
  },
  br: false // disable brotli
}))




app.use(koaBody());

// look ma, error propagation!

app.use(async (ctx: ParameterizedContext, next:Next) => {
  try {
    await next();
  } catch (err) {
    // some errors will have .status
    // however this is not a guarantee
    ctx.status = err.status || 500;
    ctx.type = 'html';
    ctx.body = '<p>Something <em>exploded</em>, please contact Maru.</p>';

    // since we handled this manually we'll
    // want to delegate to the regular app
    // level error handling as well so that
    // centralized still functions correctly.
    ctx.app.emit('error', err, ctx);
  }
});


// error handler

app.on('error', function (err) {
  if (process.env.NODE_ENV != 'test') {
    console.log('sent error %s to the cloud', err.message);
    console.log(err);
  }
});

router.get('/cat', apiController.getCat);
router.get('/baseHero', heroController.getBaseHero);



app.use(router.routes());
app.use(router.allowedMethods());




export default app;

