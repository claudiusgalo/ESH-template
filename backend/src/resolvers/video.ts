import 'reflect-metadata';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { MyContext } from 'src/types';
// import { isAuth } from '../middleware/isAuth';
import dataSource from '../data-source';
import { User } from '../entities/User';
import { Video } from '../entities/Video';
import { PaginationInput } from '../utils/PaginationInput';
// import { isAuth } from '../middleware/isAuth';

@InputType()
class VideoInput {
  @Field()
  title: string;
  @Field()
  video_link: string;
  @Field()
  description: string;
}

@ObjectType()
class PaginatedVideo {
  @Field(() => [Video])
  videos: Video[];
  @Field()
  hasMore: boolean;
  @Field()
  hasPrevious: boolean;
  @Field(() => User)
  creator?: User;
}

@Resolver(Video)
export class VideoResolver {
  // @FieldResolver(() => String)
  // textSnippet(@Root() root: Post) {
  //   const text = root.text;
  //   if (text.length <= 50) {
  //     return text;
  //   } else {
  //     return text.slice(0, 50) + '...';
  //   }
  //   //return root.text.slice(0, 50)
  // }

  @Mutation(() => Video) //Sets the graphQL type for the query
  // @UseMiddleware(isAuth)
  // @UseMiddleware(isAdmin)
  async createVideo(
    @Arg('input') input: VideoInput,
    @Ctx() { req }: MyContext
  ): Promise<Video> {
    //Sets the Typescript type
    const video = Video.create({
      ...input,
      creatorId: req.session.userId,
    });
    console.log('This is the post that we are creating: ', video);

    return video.save();
  }

  @Query(() => PaginatedVideo)
  async userVideo(
    @Arg('username', () => String) username: string,
    @Arg('pagination', () => PaginationInput) pagination: PaginationInput
  ): Promise<PaginatedVideo> {
    const { limit, cursor, direction } = pagination;
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;
    const realLimitPlusTwo = realLimit + 2;

    const qb = dataSource
      .getRepository(Video)
      .createQueryBuilder('a')
      .innerJoinAndSelect('a.creator', 'u', 'u.username = :username', {
        username,
      });

    if (cursor) {
      const cursorId = parseInt(cursor, 10);

      if (direction === 'NEXT') {
        // When moving forward, select posts with ids greater than cursorId
        qb.where('a.id > :cursorId', { cursorId });
        qb.orderBy('a.id', 'ASC').addOrderBy('a.createdAt', 'ASC'); // Add secondary order criteria
      } else if (direction === 'PREVIOUS') {
        // When moving backward, select posts with ids less than cursorId
        qb.where('a.id < :cursorId', { cursorId });
        qb.orderBy('a.id', 'DESC').addOrderBy('a.createdAt', 'DESC'); // Add secondary order criteria
      } else {
        throw new Error('Invalid pagination direction');
      }
    } else {
      // If cursor is null, simply fetch the earliest posts (lowest ID)
      qb.orderBy('a.id', 'ASC').addOrderBy('a.createdAt', 'ASC'); // Add secondary order criteria
    }

    qb.take(realLimitPlusOne); // Fetch one more to check if there are more posts

    qb.take(realLimitPlusTwo);

    //Sliding Window
    try {
      const videos = await qb.getMany();
      let hasMore = false;

      if (videos.length === realLimitPlusOne) {
        hasMore = true;
        videos.pop();
      }

      if (direction === 'PREVIOUS') {
        // For the PREVIOUS direction, we need to reverse the order of posts to get the correct adjacent posts
        videos.reverse();
      }
      return {
        videos,
        hasMore,
        hasPrevious: false,
      };
    } catch (error) {
      // Handle any potential errors (e.g., database connection issues)
      console.error('Error fetching posts:', error);
      throw new Error('Error fetching posts');
    }
  }
  @Query(() => PaginatedVideo)
  async videos(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: number | null
  ): Promise<PaginatedVideo> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const qb = await dataSource
      .getRepository(Video)
      .createQueryBuilder('v')
      .innerJoinAndSelect('v.creator', 'u', 'u.id = v.creator')
      .orderBy('v.id', 'ASC', 'NULLS FIRST')

      .take(realLimitPlusOne);

    if (cursor) {
      qb.where('v.id > :cursor', { cursor }); //This block checks if the cursor argument is provided by the client (not null). If it is, it adds a condition to the QueryBuilder to fetch posts with an id less than the cursor id.
    }

    const video = await qb.getMany();

    console.log(video);

    // console.log(User)

    return {
      videos: video.slice(0, realLimit),
      hasMore: video.length === realLimitPlusOne,
      hasPrevious: false,
    };
  }

  @Query(() => Video, { nullable: true }) //Sets the graphQL type for the query
  Video(@Arg('id') id: number): Promise<Video | null> {
    //Sets the Typescript type
    console.log(id);
    // Relations will allow us to access the creator of the post
    return Video.findOne({ where: { id }, relations: ['creator'] }); //Returns a promise
  }

  @Mutation(() => Video, { nullable: true }) //Sets the graphQL type for the query
  async updateVideo(
    @Arg('id', () => Int) id: number,
    @Arg('title', () => String, { nullable: true }) title: string
  ): Promise<Video | null> {
    const video = await Video.findOne({ where: { id } }); // First Query Finds Post
    if (!Video) {
      return null;
    }
    if (typeof title !== 'undefined') {
      await Video.update({ id }, { title }); // Second Query Updates Post
    }
    return video;
  }

  @Mutation(() => Boolean) //Defining return type
  async deleteVideo(@Arg('id') id: number): Promise<Boolean> {
    await Video.delete(id);
    return true;
  }
}
