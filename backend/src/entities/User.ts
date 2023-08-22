// import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
// import { text } from "stream/consumers";
import 'reflect-metadata';
import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Article } from './Article';
import { Listing } from './Listing';
import { Post } from './Post';
import { Video } from './Video';

@ObjectType() //Decorator that defines this as an object type
@Entity() //Decorator Telling MikroORM this is an entity
export class User extends BaseEntity {
  @Field(() => Int) //This decorator exposes this to the graphQL schema
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text' })
  first_name: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text' })
  last_name: string;

  @Field(() => String)
  @Column({ type: 'text', unique: true })
  username!: string;

  @Field(() => String)
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;
  raw: any;

  @OneToMany(() => Article, (Article) => Article.creator)
  Articles: Article[];

  @OneToMany(() => Listing, (Listing) => Listing.creator)
  Listings: Listing[];

  @OneToMany(() => Post, (post) => post.creator)
  Posts: Post[];

  @OneToMany(() => Video, (Video) => Video.creator)
  Videos: Video[];

  @Field(() => String, { nullable: true })
  realtor_url: string;

  @Field(() => String, { nullable: true })
  zillow_url: string;

  @Field(() => String, { nullable: true })
  redfin_url: string;

  @Field(() => String, { nullable: true })
  facebook_url: string;

  @Field(() => String, { nullable: true })
  youtube_url: string;

  @Field(() => String, { nullable: true })
  twitter_url: string;

  @Field(() => String, { nullable: true })
  instagram_url: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}
