import { useLogoutMutation, useMeQuery } from '@/app/graphql/gql/graphql';
import { isServer } from '@/app/utils/isServer';
import NextLink from 'next/link';
import { useEffect } from 'react';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  useEffect(() => {
    console.log('data: ', data);
    console.log(data?.me);
  }, [data]);

  const handleLogout = async () => {
    await logout({});
    window.location.reload(); // Reload the page after logout
  };

  if (!fetching && !data?.me) {
    body = (
      <div className="font-mono font-Menlo">
        <NextLink href="/login">Login</NextLink>
        <NextLink href="/register">Register</NextLink>
      </div>
    );
  } else if (!fetching && data?.me) {
    body = (
      <div className="w-full font-mono font-Menlo">
        <div className="pr-[700px] font-extrabold text-xl">YOUR LOGO HERE</div>
        <div className="mr-2">{data.me.username}</div>
        <button onClick={handleLogout}>logout</button>
      </div>
    );
  }

  return (
    <div className="bg-pink-59 flex">
      <div className="ml-auto">{body}</div>
    </div>
  );
};
