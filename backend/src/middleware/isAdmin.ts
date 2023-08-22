import { MyContext } from 'src/types';
import { MiddlewareFn } from 'type-graphql';

export const isAdmin: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (context.req.session.userId != 8) {
    throw new Error('not auth, this is not and administrator');
  }
  return next();
};
