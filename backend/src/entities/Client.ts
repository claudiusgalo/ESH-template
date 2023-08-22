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
  // ManyToOne,
} from 'typeorm';
// import { User } from './User';

@ObjectType() //Decorator that defines this as an object type
@Entity() //Decorator Telling MikroORM this is an entity
export class Client extends BaseEntity {
  @Field(() => Int) //This decorator exposes this to the graphQL schema
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  name!: string;

  @Field()
  @Column()
  phone_number: number;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  primary_language: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}
