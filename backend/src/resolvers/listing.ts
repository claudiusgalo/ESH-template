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
import { PaginationInput } from '../utils/PaginationInput';
import { Listing } from '../entities/Listing';
import { User } from '../entities/User';

@InputType()
class ListingInput {
  @Field()
  street_address: string;
  @Field()
  city: string;
  @Field()
  state: string;
  @Field()
  zip: number;
  @Field()
  country: string;
  @Field()
  zillow_link: string;
  @Field()
  has_sold: boolean;
  @Field()
  beds: number;
  @Field()
  bathrooms: number;
  @Field()
  square_footage: number;
  @Field()
  year: number;
  @Field()
  school_district: string;
  @Field()
  primary_school: string;
  @Field()
  secondary_school: string;
  @Field()
  tertiary_school: string;
  @Field()
  monthly_cost_30yr: number;
  @Field()
  monthly_cost_15yr: number;
  @Field()
  monthly_cost_10yr: number;
  @Field()
  monthly_cost_5yr: number;
  @Field(() => [String])
  tags: string[];
}

@ObjectType()
class PaginatedListings {
  @Field(() => [Listing])
  listings: Listing[];
  @Field()
  hasMore: boolean;
  @Field()
  hasPrevious: boolean;
  @Field(() => User)
  creator?: User;
}

@Resolver(Listing)
export class ListingResolver {
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

  @Mutation(() => Listing) //Sets the graphQL type for the query
  // @UseMiddleware(isAuth)
  // @UseMiddleware(isAdmin)
  async createListing(
    @Arg('input') input: ListingInput,
    @Arg('imageUrls', () => [String]) imageUrls: string[],
    @Ctx() { req }: MyContext
  ): Promise<Listing> {
    console.log('received imageUrls: ', imageUrls);
    //Sets the Typescript type
    //Please Edit this to ensure that it is correctly creating a listing object
    const listing = Listing.create({
      ...input,
      creatorId: req.session.userId,
      imageUrls: imageUrls,
    });
    console.log('This is the post that we are creating: ', listing);

    return listing.save();
  }

  @Query(() => PaginatedListings)
  async userListing(
    @Arg('username', () => String) username: string,
    @Arg('pagination', () => PaginationInput) pagination: PaginationInput
  ): Promise<PaginatedListings> {
    const { limit, cursor, direction } = pagination;
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const qb = dataSource
      .getRepository(Listing)
      .createQueryBuilder('l')
      .innerJoinAndSelect('l.creator', 'u', 'u.username = :username', {
        username,
      });

    if (cursor) {
      const cursorId = parseInt(cursor, 10);

      if (direction === 'NEXT') {
        // When moving forward, select posts with ids greater than cursorId
        qb.where('l.id > :cursorId', { cursorId });
        qb.orderBy('l.id', 'ASC').addOrderBy('l.createdAt', 'ASC'); // Add secondary order criteria
      } else if (direction === 'PREVIOUS') {
        // When moving backward, select posts with ids less than cursorId
        qb.where('l.id < :cursorId', { cursorId });
        qb.orderBy('l.id', 'DESC').addOrderBy('l.createdAt', 'DESC'); // Add secondary order criteria
      } else {
        throw new Error('Invalid pagination direction');
      }
    } else {
      // If cursor is null, simply fetch the earliest posts (lowest ID)
      qb.orderBy('l.id', 'ASC').addOrderBy('l.createdAt', 'ASC'); // Add secondary order criteria
    }

    qb.take(realLimitPlusOne); // Fetch one more to check if there are more posts

    try {
      const listings = await qb.getMany();
      let hasMore = false;

      if (listings.length === realLimitPlusOne) {
        hasMore = true;
        listings.pop();
      }

      if (direction === 'PREVIOUS') {
        // For the PREVIOUS direction, we need to reverse the order of posts to get the correct adjacent posts
        listings.reverse();
      }
      return {
        listings,
        hasMore,
        hasPrevious: false,
      };
    } catch (error) {
      // Handle any potential errors (e.g., database connection issues)
      console.error('Error fetching posts:', error);
      throw new Error('Error fetching posts');
    }
  }
  @Query(() => PaginatedListings)
  async listings(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: number | null
  ): Promise<PaginatedListings> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const qb = await dataSource
      .getRepository(Listing)
      .createQueryBuilder('l')
      .innerJoinAndSelect('l.creator', 'u', 'u.id = l.creator')
      .orderBy('l.id', 'ASC', 'NULLS FIRST')

      .take(realLimitPlusOne);

    if (cursor) {
      qb.where('p.id > :cursor', { cursor }); //This block checks if the cursor argument is provided by the client (not null). If it is, it adds a condition to the QueryBuilder to fetch posts with an id less than the cursor id.
    }

    const listings = await qb.getMany();

    console.log(listings);

    // console.log(User)

    return {
      listings: listings.slice(0, realLimit),
      hasMore: listings.length === realLimitPlusOne,
      hasPrevious: false,
    };
  }

  @Query(() => Listing, { nullable: true }) //Sets the graphQL type for the query
  listing(@Arg('id') id: number): Promise<Listing | null> {
    //Sets the Typescript type
    console.log(id);
    // Relations will allow us to access the creator of the post
    return Listing.findOne({ where: { id }, relations: ['creator'] }); //Returns a promise
  }

  @Mutation(() => Listing, { nullable: true }) //Sets the graphQL type for the query
  async updateListing(
    @Arg('id', () => Int) id: number,
    @Arg('street_address', () => String, { nullable: true })
    street_address: string
  ): Promise<Listing | null> {
    const listing = await Listing.findOne({ where: { id } }); // First Query Finds Post
    if (!Listing) {
      return null;
    }
    if (typeof street_address !== 'undefined') {
      await Listing.update({ id }, { street_address }); // Second Query Updates Post
    }
    return listing;
  }

  @Mutation(() => Boolean) //Defining return type
  async deleteListing(@Arg('id') id: number): Promise<Boolean> {
    await Listing.delete(id);
    return true;
  }
}
