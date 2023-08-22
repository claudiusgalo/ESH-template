import { PostsQuery, useLikeMutation } from '@/app/graphql/gql/graphql';

interface LikeButtonProps {
  post: PostsQuery['posts']['posts'][0]; //Selecting type from type of PostsQuery
}

export const LikeButton: React.FC<LikeButtonProps> = ({ post }) => {
  const [, like] = useLikeMutation();
  return (
    <div className="bg-orange-55 p-2">
      <button
        onClick={() => {
          like({
            postId: post.id,
            value: 1,
          });
        }}
        className="bg-blue-55 text-white-58 aspect-square"
      >
        <img
          src="/thin-heart.svg"
          width="16"
          height="16"
          alt="Heart"
        />
      </button>
      <button
        onClick={() => {
          like({
            postId: post.id,
            value: -1,
          });
        }}
        className="bg-yellow-55 text-white-58 w-full"
      >
        DOWN
      </button>
      <div>{post.likes}</div>
    </div>
  );
};
