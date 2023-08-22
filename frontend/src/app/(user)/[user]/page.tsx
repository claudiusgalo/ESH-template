'use client';
import { usePostsQuery, useUserPostsQuery } from '@/app/graphql/gql/graphql';
import { createUrqlClient } from '@/app/utils/createUrqlClient';
import { LikeButton } from '@/components/LikeButton';
import { Token } from 'graphql';
import { withUrqlClient } from 'next-urql';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import NextLink from 'next/navigation';
import Wrapper from '@/components/Wrapper';

//q: how could I abstract away some of this code?
//a: you could create a new component and pass the data to it as props. You can also use the data in the same component, but you need to make sure that the data is available before you use it. You can do this by using the useEffect hook.
//q: how would I do that?

function Page({ params }: { params: { token: string } }) {
  console.log(params);
  const router = useRouter();
  // console.log(params.token)
  // params.user
  console.log(params['user']);

  const [variables, setVariables] = useState({
    username: params['user'],
    pagination: { limit: 2 }, // Include the pagination object with the limit only
    cursor: '', // Include the cursor property separately
    direction: '', // Include the direction property separately
  });

  const [{ data, fetching, error }] = useUserPostsQuery({
    variables: {
      username: variables.username,
      pagination: {
        // Pass the pagination object with the limit only
        limit: variables.pagination.limit,
        cursor: variables.cursor || '',
        direction: variables.direction || '',
      },
    },
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!fetching && !data) {
    return <div>You got query failed for some reason</div>;
  }

  const handleNextPage = () => {
    if (data?.userposts.posts && data.userposts.posts.length > 0) {
      // This is because we send an additonial post to the server to check if there is a next page
      const lastPost = data.userposts.posts[data.userposts.posts.length - 1];
      console.log(lastPost.id.toString());
      //Is setting the varaibles enough to trigger the query?
      //Yes, it is. The query will be triggered when the variables change.
      setVariables({
        ...variables,
        cursor: lastPost.id.toString(),
        direction: 'NEXT', // Set the direction to 'forward'
      });
    }
  };

  const handlePreviousPage = () => {
    if (data?.userposts.posts && data.userposts.posts.length > 0) {
      const firstPost = data.userposts.posts[0];
      console.log(firstPost.id.toString());
      const cursorId = firstPost.id.toString();
      setVariables({
        ...variables,
        cursor: firstPost.id.toString(),
        direction: 'PREVIOUS', // Set the direction to 'backward'
      });
    }
  };

  return (
    <Wrapper pageProps={undefined}>
      <div className="container flex-col h-screen w-screen p-2 bg-blue-54 overflow-clip">
        {/* Your JSX content */}
        <div className="container h-[16%] justify-between items-center mb-4 bg-red-55">
          poo
        </div>
        <div className="container h-[28%] justify-between items-center mb-4 bg-orange-55">
          Current Offers
        </div>
        <div className="container h-[45%] justify-between items-center mb-4 bg-red-55">
          <div className="container h-[11%] justify-between items-center mb-4 bg-orange-55">
            closet
          </div>
          <div className="container h-[35%] justify-between items-center mb-4 bg-green-55">
            {/* Render the posts data */}
          </div>
          {/* Add the buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousPage}
              // disabled={!data?.userposts.hasMore}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={!data?.userposts.hasMore}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default withUrqlClient(createUrqlClient)(Page);
