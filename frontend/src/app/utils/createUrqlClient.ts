
import { LogoutMutation, MeQuery, MeDocument, LoginMutation, RegisterMutation } from "../graphql/gql/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { fetchExchange, stringifyVariables } from "urql";
import { cacheExchange, Resolver } from "@urql/exchange-graphcache";



export const createUrqlClient = (ssrExchange: any) => ({
    url: 'http://localhost:4000/graphql',
  // exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    credentials: 'include' as const,
  },
  exchanges: [fetchExchange, cacheExchange({
    keys: {
      PaginatedPosts: () => null,
    },
    updates: {
      Mutation: {
        logout: (_result, args, cache, info) => {
          betterUpdateQuery<LogoutMutation, MeQuery>(
            cache, 
            {query: MeDocument},
            _result,
            () => ({me: null})
          );
        },
        login: (_result, args, cache, info) =>{ //Updates cache when LoginMutation is run & updates MeQuery
          betterUpdateQuery<LoginMutation, MeQuery>(
            cache, 
            { query: MeDocument },
            _result,
            (result, query) => {
              if (result.login.errors) {
                return query
              } else {
                return {
                  me: result.login.user,
                };
              }
            }
          );
        },
        register: (_result, args, cache, info) =>{ //Updates cache when RegisterMutation is run
          betterUpdateQuery<RegisterMutation, MeQuery>(
            cache, 
            { query: MeDocument },
            _result,
            (result, query) => {
              if (result.register.errors) {
                return query
              } else {
                return {
                  me: result.register.user,
                };
              }
            }
          );
        },
      },
    },
  }),
  ssrExchange,
  fetchExchange,
],
});