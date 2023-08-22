//FILE OVERVIEW: This file contains the resolvers for the Post type

import 'reflect-metadata';
import { Post } from '../entities/Post';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { MyContext } from 'src/types';
// import { isAuth } from '../middleware/isAuth';
import dataSource from '../data-source';
import { User } from '../entities/User';
import { isAdmin } from '../middleware/isAdmin';
import { PaginationInput } from '../utils/PaginationInput';

@InputType()
class PostInput {
  @Field()
  title: string;
  @Field()
  text: string;
}

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];
  @Field()
  hasMore: boolean;
  @Field()
  hasPrevious: boolean;
  @Field(() => User)
  creator?: User;
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() root: Post) {
    const text = root.text;
    if (text.length <= 50) {
      return text;
    } else {
      return text.slice(0, 50) + '...';
    }
    //return root.text.slice(0, 50)
  }

  @Mutation(() => Post) //Sets the graphQL type for the query
  // @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async createPost(
    @Arg('input') input: PostInput,
    @Arg('imageUrls', () => [String]) imageUrls: string[],
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    console.log('received imageUrls: ', imageUrls);
    //Sets the Typescript type
    const post = Post.create({
      ...input,
      creatorId: req.session.userId,
      imageUrls: imageUrls,
    });
    console.log('This is the post that we are creating: ', post);

    return post.save();
  }

  @Query(() => PaginatedPosts)
  async userposts(
    @Arg('username', () => String) username: string,
    @Arg('pagination', () => PaginationInput) pagination: PaginationInput
  ): Promise<PaginatedPosts> {
    const { limit, cursor, direction } = pagination;
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const qb = dataSource
      .getRepository(Post)
      .createQueryBuilder('p')
      .innerJoinAndSelect('p.creator', 'u', 'u.username = :username', {
        username,
      });

    if (cursor) {
      const cursorId = parseInt(cursor, 10);

      if (direction === 'NEXT') {
        // When moving forward, select posts with ids greater than cursorId
        qb.where('p.id > :cursorId', { cursorId });
        qb.orderBy('p.id', 'ASC').addOrderBy('p.createdAt', 'ASC'); // Add secondary order criteria
      } else if (direction === 'PREVIOUS') {
        // When moving backward, select posts with ids less than cursorId
        qb.where('p.id < :cursorId', { cursorId });
        qb.orderBy('p.id', 'DESC').addOrderBy('p.createdAt', 'DESC'); // Add secondary order criteria
      } else {
        throw new Error('Invalid pagination direction');
      }
    } else {
      // If cursor is null, simply fetch the earliest posts (lowest ID)
      qb.orderBy('p.id', 'ASC').addOrderBy('p.createdAt', 'ASC'); // Add secondary order criteria
    }

    qb.take(realLimitPlusOne); // Fetch one more to check if there are more posts

    try {
      const posts = await qb.getMany();
      let hasMore = false;

      if (posts.length === realLimitPlusOne) {
        hasMore = true;
        posts.pop();
      }

      if (direction === 'PREVIOUS') {
        // For the PREVIOUS direction, we need to reverse the order of posts to get the correct adjacent posts
        posts.reverse();
      }
      return {
        posts,
        hasMore,
        hasPrevious: false,
      };
    } catch (error) {
      // Handle any potential errors (e.g., database connection issues)
      console.error('Error fetching posts:', error);
      throw new Error('Error fetching posts');
    }
  }
  @Query(() => PaginatedPosts)
  async posts(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: number | null
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const qb = await dataSource
      .getRepository(Post)
      .createQueryBuilder('p')
      .innerJoinAndSelect('p.creator', 'u', 'u.id = p.creator')
      .orderBy('p.id', 'ASC', 'NULLS FIRST')

      .take(realLimitPlusOne);

    if (cursor) {
      qb.where('p.id > :cursor', { cursor }); //This block checks if the cursor argument is provided by the client (not null). If it is, it adds a condition to the QueryBuilder to fetch posts with an id less than the cursor id.
    }

    const posts = await qb.getMany();

    console.log(posts);

    // console.log(User)

    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === realLimitPlusOne,
      hasPrevious: false,
    };
  }

  @Query(() => Post, { nullable: true }) //Sets the graphQL type for the query
  post(@Arg('id') id: number): Promise<Post | null> {
    //Sets the Typescript type
    console.log(id);
    // Relations will allow us to access the creator of the post
    return Post.findOne({ where: { id }, relations: ['creator'] }); //Returns a promise
  }

  @Mutation(() => Post, { nullable: true }) //Sets the graphQL type for the query
  async updatePost(
    @Arg('id', () => Int) id: number,
    @Arg('title', () => String, { nullable: true }) title: string
  ): Promise<Post | null> {
    const post = await Post.findOne({ where: { id } }); // First Query Finds Post
    if (!post) {
      return null;
    }
    if (typeof title !== 'undefined') {
      await Post.update({ id }, { title }); // Second Query Updates Post
    }
    return post;
  }

  @Mutation(() => Boolean) //Defining return type
  async deletePost(@Arg('id') id: number): Promise<Boolean> {
    await Post.delete(id);
    return true;
  }
}
