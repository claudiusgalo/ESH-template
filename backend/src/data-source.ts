import { DataSource } from 'typeorm';
import { User } from './entities/User';
import 'reflect-metadata';
import path from 'path';
import { Listing } from './entities/Listing';
import { Client } from './entities/Client';
import { Article } from './entities/Article';
import { Post } from './entities/Post';
import { Video } from './entities/Video';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: '',
  database: 'esh_database',
  synchronize: true,
  logging: true,
  migrations: [path.join(__dirname, './migrations/*')],
  entities: [Article, Listing, User, Post, Client, Video],
});

export default AppDataSource;
