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
export class Listing extends BaseEntity {
  @Field(() => Int) //This decorator exposes this to the graphQL schema
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  street_address!: string;

  @Field(() => String)
  @Column()
  city!: string;

  @Field(() => String)
  @Column()
  state!: string;

  @Field(() => String)
  @Column()
  zip!: number;

  @Field(() => String)
  @Column()
  country!: string;

  @Field()
  @Column()
  zillow_link!: string;

  @Field(() => Boolean)
  @Column()
  has_sold!: boolean;

  @Field()
  @Column({ type: 'int', default: 0 })
  beds!: number;

  @Field()
  @Column({ type: 'int', default: 0 })
  bathrooms!: number;

  @Field()
  @Column({ type: 'int', default: 0 })
  square_footage!: number;

  @Field()
  @Column({ type: 'int', default: 0 })
  year!: number;

  @Field(() => String)
  @Column({ type: 'text', default: 0 })
  school_district: String;

  @Field(() => String)
  @Column({ type: 'text', default: 0 })
  primary_school: string;

  @Field(() => String)
  @Column({ type: 'text', default: 0 })
  secondary_school: string;

  @Field(() => String)
  @Column({ type: 'text', default: 0 })
  tertiary_school: string;

  @Field(() => String)
  @Column({ type: 'int', default: 0 })
  monthly_cost_30yr: number;

  @Field(() => String)
  @Column({ type: 'int', default: 0 })
  monthly_cost_15yr: number;

  @Field(() => String)
  @Column({ type: 'int', default: 0 })
  monthly_cost_10yr: number;

  @Field(() => String)
  @Column({ type: 'int', default: 0 })
  monthly_cost_5yr: number;

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  tags: string[];

  @Field()
  @Column()
  creatorId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.Listings)
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
