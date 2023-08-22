import { ObjectType, Field, Int } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@ObjectType() //Decorator that defines this as an object type
@Entity() //Decorator Telling MikroORM this is an entity
export class Video extends BaseEntity {
  @Field(() => Int) //This decorator exposes this to the graphQL schema
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  title!: string;

  @Field(() => String, { nullable: true })
  @Column()
  video_link: string;

  @Field(() => String, { nullable: true })
  @Column()
  description: string;

  @Field()
  @Column()
  creatorId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.Videos)
  creator: User;

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  imageUrls: string[]; // This field will store the array of URLs

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}
