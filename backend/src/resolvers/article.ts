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
import { Article } from '../entities/Article';
import { PaginationInput } from '../utils/PaginationInput';

@InputType()
class ArticleInput {
  @Field()
  title: string;
  @Field()
  body_1: string;
  @Field()
  body_2: string;
  @Field()
  body_3: string;
  @Field()
  body_4: string;
  @Field()
  body_5: string;
}

@ObjectType()
class PaginatedArticles {
  @Field(() => [Article])
  articles: Article[];
  @Field()
  hasMore: boolean;
  @Field()
  hasPrevious: boolean;
  @Field(() => User)
  creator?: User;
}

@Resolver(Article)
export class ArticleResolver {
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

  @Mutation(() => Article) //Sets the graphQL type for the query
  // @UseMiddleware(isAuth)
  // @UseMiddleware(isAdmin)
  async createArticle(
    @Arg('input') input: ArticleInput,
    @Arg('imageUrls', () => [String]) imageUrls: string[],
    @Ctx() { req }: MyContext
  ): Promise<Article> {
    console.log('received imageUrls: ', imageUrls);
    //Sets the Typescript type
    const article = Article.create({
      ...input,
      creatorId: req.session.userId,
      imageUrls: imageUrls,
    });
    console.log('This is the post that we are creating: ', article);

    return article.save();
  }

  @Query(() => PaginatedArticles)
  async userArticles(
    @Arg('username', () => String) username: string,
    @Arg('pagination', () => PaginationInput) pagination: PaginationInput
  ): Promise<PaginatedArticles> {
    const { limit, cursor, direction } = pagination;
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const qb = dataSource
      .getRepository(Article)
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

    try {
      const articles = await qb.getMany();
      let hasMore = false;

      if (articles.length === realLimitPlusOne) {
        hasMore = true;
        articles.pop();
      }

      if (direction === 'PREVIOUS') {
        // For the PREVIOUS direction, we need to reverse the order of posts to get the correct adjacent posts
        articles.reverse();
      }
      return {
        articles,
        hasMore,
        hasPrevious: false,
      };
    } catch (error) {
      // Handle any potential errors (e.g., database connection issues)
      console.error('Error fetching posts:', error);
      throw new Error('Error fetching posts');
    }
  }
  @Query(() => PaginatedArticles)
  async articles(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: number | null
  ): Promise<PaginatedArticles> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const qb = await dataSource
      .getRepository(Article)
      .createQueryBuilder('a')
      .innerJoinAndSelect('a.creator', 'u', 'u.id = a.creator')
      .orderBy('a.id', 'ASC', 'NULLS FIRST')

      .take(realLimitPlusOne);

    if (cursor) {
      qb.where('p.id > :cursor', { cursor }); //This block checks if the cursor argument is provided by the client (not null). If it is, it adds a condition to the QueryBuilder to fetch posts with an id less than the cursor id.
    }

    const article = await qb.getMany();

    console.log(article);

    // console.log(User)

    return {
      articles: article.slice(0, realLimit),
      hasMore: article.length === realLimitPlusOne,
      hasPrevious: false,
    };
  }

  @Query(() => Article, { nullable: true }) //Sets the graphQL type for the query
  article(@Arg('id') id: number): Promise<Article | null> {
    //Sets the Typescript type
    console.log(id);
    // Relations will allow us to access the creator of the post
    return Article.findOne({ where: { id }, relations: ['creator'] }); //Returns a promise
  }

  @Mutation(() => Article, { nullable: true }) //Sets the graphQL type for the query
  async updateArticle(
    @Arg('id', () => Int) id: number,
    @Arg('title', () => String, { nullable: true }) title: string
  ): Promise<Article | null> {
    const article = await Article.findOne({ where: { id } }); // First Query Finds Post
    if (!Article) {
      return null;
    }
    if (typeof title !== 'undefined') {
      await Article.update({ id }, { title }); // Second Query Updates Post
    }
    return article;
  }

  @Mutation(() => Boolean) //Defining return type
  async deleteArticle(@Arg('id') id: number): Promise<Boolean> {
    await Article.delete(id);
    return true;
  }
}
