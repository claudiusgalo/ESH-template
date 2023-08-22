// import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core"
// import { Request, Response } from "express"

// export type MyContext = {
//     em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
//     req: Request;
//     res: Response;
// }

// // Those who are struggling with the session type at 1:55:01  this is solution :-
// import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core"
// import { Request, Response } from "express"
// import { Session } from "express-session"
// export type MyContext = {
//   em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
//   req: Request & { session: Session & { userId: number } };
//   res: Response;
// }

import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId: number };
  };
  res: Response;
  redis: Redis;
};