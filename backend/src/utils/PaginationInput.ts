import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class PaginationInput {
  @Field(() => String, { nullable: true })
  cursor: string | null;
  @Field(() => Int)
  limit: number;
  @Field(() => String, { nullable: true })
  direction: string | null;
}
