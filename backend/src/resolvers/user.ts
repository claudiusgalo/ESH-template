import 'reflect-metadata';
import { MyContext } from '../types';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import argon2 from 'argon2';
import { User } from '../entities/User';
import { UsernamePasswordInput } from '../utils/UsernamePasswordInput';
import { validateRegister } from '../utils/validateRegister';
import { v4 } from 'uuid';
import { sendEmail } from '../utils/sendMail';
import { FORGOT_PASSWORD_PREFIX } from '../constants';
// import AppDataSource from "../data-source"
// import { sendEmail } from "src/utils/sendMail"

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType() //Used to define Objects, can be used to return from our mutations
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    // this is the current user and its ok to show them their own email
    if (req.session.userId === user.id) {
      return user.email;
    }
    // current user wants to see someone elses email
    return '';
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length <= 3) {
      return {
        errors: [
          {
            field: 'newPassword',
            message: 'length must be greater than 3',
          },
        ],
      };
    }
    const key = FORGOT_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    if (!userId) {
      return {
        errors: [
          {
            field: 'token',
            message: 'token expired',
          },
        ],
      };
    }
    const userIdNum = parseInt(userId);
    const user = await User.findOne({ where: { id: userIdNum } });

    if (!user) {
      return {
        errors: [
          {
            field: 'token',
            message: 'user no longer exists',
          },
        ],
      };
    }

    User.update(
      { id: userIdNum },
      { password: await argon2.hash(newPassword) }
    );

    await redis.del(key);

    //login user after change password
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return true;
    }
    const token = v4();

    await redis.set(
      FORGOT_PASSWORD_PREFIX + token,
      user.id,
      'EX',
      1000 * 60 * 60 * 24
    );

    await sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}"> reset password </a>`
    );

    return true;
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    console.log('Session: ', req.session);
    //You are not logged in
    if (!req.session.userId) {
      return null;
    }
    return User.findOne({ where: { id: req.session.userId } });
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);

    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);

    try {
      const user = await User.create({
        username: options.username,
        email: options.email,
        password: hashedPassword,
        first_name: options.first_name,
        last_name: options.last_name,
      }).save();

      req.session.userId = user.id; // Store user id in session

      return { user };
    } catch (err) {
      if (err.code === '23505') {
        return {
          errors: [
            {
              field: 'username',
              message: 'Username is already taken.',
            },
          ],
        };
      }
      console.log('err: ', err);
      throw new Error('User registration failed.');
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('usernameOrEmail') usernameOrEmail: string,
    @Arg('password') password: string,

    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes('@')
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    );
    if (!user) {
      return {
        errors: [
          {
            field: 'usernameOrEmail',
            message: 'that username does not exist',
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, password); //Returns T/F if password matches.
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'incorrect password',
          },
        ],
      };
    }
    //Stores userId
    req.session.userId = user.id; // Possibly Undefined *** I Have changed the session type to not allow undefined values** //Added a ? flag in front of client//
    console.log("This is the user's ID", req.session.userId);
    return {
      user,
    };
  }
  // @Query(() => Boolean)
  // userAuth(@Ctx() {req}: MyContext {

  // }
  // )

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie('qid');
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
        //Place res.clearCookie("qid") here if you want to clear the cookie only if was destroyed.
      })
    );
  }
}
