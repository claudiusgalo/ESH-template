// import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import 'reflect-metadata';
import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { User } from './User';

@ObjectType() //Decorator that defines this as an object type
@Entity() //Decorator Telling MikroORM this is an entity
export class Post extends BaseEntity {
  @Field(() => Int) //This decorator exposes this to the graphQL schema
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  title!: string;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column({ type: 'int', default: 0 })
  likes!: number;

  @Field()
  @Column()
  creatorId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.Posts)
  creator: User;

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  imageUrls: string[]; // This field will store the array of URLs

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  imageUrlsMedium: string[]; // This field will store the array of URLs

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  imageUrlsSmall: string[]; // This field will store the array of URLs

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}
