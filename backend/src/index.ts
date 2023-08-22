// THIS CODE WORKS FOR FRONTEND!//
import 'reflect-metadata';
// import { MikroORM } from "@mikro-orm/core";
// import { __prod__, COOKIE_NAME } from "./constants";
import { COOKIE_NAME, __prod__ } from './constants';
// import microConfig from "./mikro-orm.config";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import { ArticleResolver } from './resolvers/article';
import { Redis } from 'ioredis';
import session from 'express-session';
import cors from 'cors';
import RedisStore from 'connect-redis';
import AppDataSource from './data-source';
import { S3Resolver } from './utils/resolvers/s3_SignImages';
import { ListingResolver } from './resolvers/listing';
import { VideoResolver } from './resolvers/video';
require('dotenv').config();

// CODE FOR RUNNING ON WEB //

const main = async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized');
    })
    .catch((err) => {
      console.log('Error occured during Data Source initialization: ', err);
    });
  // await Post.delete({})
  // await Post.delete({});
  // await User.delete({});
  // await Article.delete({});
  await AppDataSource.runMigrations();

  // sendEmail('galoclaudius@gmail.com', "Hello")
  // const orm = await MikroORM.init(mikroConfig);
  // await orm.em.nativeDelete(User, {});
  // await orm.getMigrator().up();

  const app = express();

  // const RedisStore = connectRedis(session);
  const redis = new Redis({
    host: 'localhost',
    port: 6379,
  });

  // const redisClient = redis.createClient();

  //CORS For Production
  // app.use(
  //   cors({
  //     origin: [
  //       'https://elcysellshomes.com',
  //     ],
  //     credentials: true,
  //   })
  // );

  app.use(
    cors({
      origin: [
        'http://localhost:3000',
        'https://studio.apollographql.com',
        'http://studio.apollographql.com',
        'http://localhost:4000',
        'http://localhost:4000/graphql',
      ],
      credentials: true,
    })
  );
  app.set('trust proxy', process.env.NODE_ENV !== 'production');
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: 'qowiueojwojfalksdjoqiwueo',
      resave: false,
    })
  );

  // app.use(
  //   session({
  //     name: COOKIE_NAME,
  //     store: new RedisStore({
  //       client: redis,
  //       disableTouch: true,
  //     }),
  //     cookie: {
  //       maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
  //       httpOnly: true, //Deleted maybe???
  //       sameSite: 'none', // csrf
  //       secure: true, // cookie only works in https
  //     },
  //     saveUninitialized: false,
  //     secret: 'qowiueojwojfalksdjoqiwueo',
  //     resave: false,
  //   })
  // );

  //Production
  // app.use(
  //   session({
  //     name: COOKIE_NAME,
  //     store: new RedisStore({
  //       client: redis,
  //       disableTouch: true,
  //     }),
  //     cookie: {
  //       maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
  //       httpOnly: true, //Deleted maybe???
  //       sameSite: 'none', // csrf
  //       secure: true, // cookie only works in https
  //       domain: '.elcysellshomes.com',
  //     },
  //     saveUninitialized: false,
  //     secret: 'qowiueojwojfalksdjoqiwueo',
  //     resave: false,
  //   })
  // );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        PostResolver,
        UserResolver,
        ArticleResolver,
        ListingResolver,
        VideoResolver,
        S3Resolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
  });

  await apolloServer.start(); // Add this line to start the Apollo Server

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log('server started on localhost:4000');
  });
};

main().catch((err) => {
  console.error(err);
});

console.log('----- Running Web Config -----');
