"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
require("reflect-metadata");
const Post_1 = require("./entities/Post");
const path_1 = __importDefault(require("path"));
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: '',
    database: 'esh_database',
    synchronize: true,
    logging: true,
    migrations: [path_1.default.join(__dirname, './migrations/*')],
    entities: [Post_1.Post, User_1.User],
});
exports.default = AppDataSource;
//# sourceMappingURL=data-source.js.map