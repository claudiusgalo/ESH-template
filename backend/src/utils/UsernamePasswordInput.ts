import { InputType, Field } from 'type-graphql';

@InputType() //Used to define Arguments
export class UsernamePasswordInput {
  @Field(() => String)
  username: string;
  @Field(() => String)
  password: string;
  @Field(() => String)
  first_name: string;
  @Field(() => String)
  last_name: string;
  @Field(() => String)
  email: string;
}
