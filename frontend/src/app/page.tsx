'use client';
import { NavBar } from '@/components/Navbar';
import Link from 'next/link';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from './utils/createUrqlClient';
import { usePostsQuery } from './graphql/gql/graphql';
import NextLink from 'next/link';
import { useState } from 'react';
import { LikeButton } from '@/components/LikeButton';
import Image from 'next/image';
import ezgif from 'public/ezgif.com-crop-2.gif';
import { useParams } from 'next/navigation';
import { ItemList } from '@/components/PostList';
import { Footer } from '@/components/Footer';

//q: how could I abstract away some of this code?
//a: you could create a new component and pass the data to it as props. You can also use the data in the same component, but you need to make sure that the data is available before you use it. You can do this by using the useEffect hook.
//q: what data would I pass into the component?
//a: you could pass in the data from the query
//q: how would I do that?
//a: you could use the useState hook to store the data from the query in a variable, and then pass that variable to the component as props
//q: would it not be better to call the query from that compoenent?
//a: you could do that, but you would need to make sure that the data is available before you use it. You can do this by using the useEffect hook.
//q: please explain the useEffect hook
//a:
//q: what is the difference between using const and function?
//a: const is a variable that cannot be changed, and function is a block of code that can be called

const Home = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: '0',
  });

  console.log(variables);

  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: variables.limit,
      cursor: variables.cursor || '',
    },
  });

  console.log(data);

  if (!fetching && !data) {
    return <div> you got query failed for some reason </div>;
  }

  return (
    <div>
      <NavBar />
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-mono font-Menlo">listings</h1>
        <NextLink
          href="/create-post"
          className="flex font-mono font-Menlo border text-center bg-orange-58 border-white-60 text-white-60 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        >
          NEW LISTING
        </NextLink>
      </header>
      <div className="flex justify-center items-center">
        <Image
          className="flex self-center"
          src={ezgif}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
          alt="frontend-web/public/vercel.svg"
          // unoptimized={true}
        />
      </div>
      <ItemList />
      <Footer />
    </div>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Home);

// export default function Home() {
//   return (
//     <>
//     <NavBar/>
//       <header className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl">Todos</h1>
//         <Link href="/new" className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">
//          New
//         </Link>
//       </header>
//       <ul className="pl-4">
//         {/* {todos.map(todo =>)} */}
//       </ul>
//     </>
//   );
// }
