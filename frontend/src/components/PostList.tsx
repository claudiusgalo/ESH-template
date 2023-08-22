import { withUrqlClient } from 'next-urql';
import { LikeButton } from './LikeButton';
import NextLink from 'next/link';
import { useState } from 'react';
import { usePostsQuery } from '@/app/graphql/gql/graphql';
import { IndividualListingSmallTest } from '@/components_prefabs/individualListingSmallTest';

// This component defines the usePostsQuery and the manner in which the individual items will be displayed
// According to the top div in the return statement, the data is stored in the variable data.
export function ItemList() {
  // The Shape of data is...
  // {
  //   posts: {
  //     hasMore: true,
  //     posts: [
  //       [Object], [Object],
  //       [Object], [Object],
  //       [Object], [Object],
  //       [Object], [Object],
  //       [Object], [Object]
  //     ]
  //   }
  // }

  const [variables, setVariables] = useState({
    limit: 10,
    cursor: '',
  });

  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: variables.limit,
      cursor: variables.cursor || '',
    },
  });
  // If screen width is > 1920px, display 7 columns
  // If screen width is > 1236px, display 6 columns
  // If screen width is > 1440px, display 5 columns
  // If screen width is > 768px, display 3 columns

  // If screen width is < 1440px, display 6 columns
  // If screen width is < 850px, display 3 columns
  //"grid justify-items-center xxs:grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-7"

  return (
    <div className="grid justify-items-center xxs:grid-cols-3">
      {!data && fetching ? (
        <div> loading... </div>
      ) : (
        data!.posts.posts.map((p) => <IndividualListingSmallTest p={p} />)
      )}
      {data && data.posts.hasMore ? (
        <div className="flex">
          <button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor:
                  data.posts.posts[data.posts.posts.length - 1].id.toString(),
              });
            }}
            className="m-auto my-4"
          >
            {' '}
            Load More{' '}
          </button>
        </div>
      ) : null}
    </div>
  );
}
