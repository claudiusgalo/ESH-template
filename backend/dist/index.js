"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const constants_1 = require("./constants");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const post_1 = require("./resolvers/post");
const user_1 = require("./resolvers/user");
const ioredis_1 = require("ioredis");
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const data_source_1 = __importDefault(require("./data-source"));
require('dotenv').config();
const main = async () => {
    await data_source_1.default.initialize()
        .then(() => {
        console.log('Data Source has been initialized');
    })
        .catch((err) => {
        console.log('Error occured during Data Source initialization: ', err);
    });
    await data_source_1.default.runMigrations();
    const app = (0, express_1.default)();
    const redis = new ioredis_1.Redis({
        host: 'localhost',
        port: 6379,
    });
    app.use((0, cors_1.default)({
        origin: [
            'http://localhost:3000',
            'https://studio.apollographql.com',
            'http://localhost:4000',
        ],
        credentials: true,
    }));
    app.use((0, express_session_1.default)({
        name: constants_1.COOKIE_NAME,
        store: new connect_redis_1.default({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: 'lax',
            secure: constants_1.__prod__,
        },
        saveUninitialized: false,
        secret: 'qowiueojwojfalksdjoqiwueo',
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [hello_1.HelloResolver, post_1.PostResolver, user_1.UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, redis }),
    });
    await apolloServer.start();
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
//# sourceMappingURL=index.js.map