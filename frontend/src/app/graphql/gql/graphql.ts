/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Article = {
  __typename?: 'Article';
  body_1: Scalars['String']['output'];
  body_2: Scalars['String']['output'];
  body_3: Scalars['String']['output'];
  body_4: Scalars['String']['output'];
  body_5: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  creator: User;
  creatorId: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  imageUrls?: Maybe<Array<Scalars['String']['output']>>;
  likes: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type ArticleInput = {
  body_1: Scalars['String']['input'];
  body_2: Scalars['String']['input'];
  body_3: Scalars['String']['input'];
  body_4: Scalars['String']['input'];
  body_5: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type Listing = {
  __typename?: 'Listing';
  bathrooms: Scalars['Float']['output'];
  beds: Scalars['Float']['output'];
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  creator: User;
  creatorId: Scalars['Float']['output'];
  has_sold: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  imageUrls?: Maybe<Array<Scalars['String']['output']>>;
  imageUrlsMedium?: Maybe<Array<Scalars['String']['output']>>;
  imageUrlsSmall?: Maybe<Array<Scalars['String']['output']>>;
  monthly_cost_5yr: Scalars['String']['output'];
  monthly_cost_10yr: Scalars['String']['output'];
  monthly_cost_15yr: Scalars['String']['output'];
  monthly_cost_30yr: Scalars['String']['output'];
  primary_school: Scalars['String']['output'];
  school_district: Scalars['String']['output'];
  secondary_school: Scalars['String']['output'];
  square_footage: Scalars['Float']['output'];
  state: Scalars['String']['output'];
  street_address: Scalars['String']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  tertiary_school: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  year: Scalars['Float']['output'];
  zillow_link: Scalars['String']['output'];
  zip: Scalars['String']['output'];
};

export type ListingInput = {
  bathrooms: Scalars['Float']['input'];
  beds: Scalars['Float']['input'];
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  has_sold: Scalars['Boolean']['input'];
  monthly_cost_5yr: Scalars['Float']['input'];
  monthly_cost_10yr: Scalars['Float']['input'];
  monthly_cost_15yr: Scalars['Float']['input'];
  monthly_cost_30yr: Scalars['Float']['input'];
  primary_school: Scalars['String']['input'];
  school_district: Scalars['String']['input'];
  secondary_school: Scalars['String']['input'];
  square_footage: Scalars['Float']['input'];
  state: Scalars['String']['input'];
  street_address: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']>;
  tertiary_school: Scalars['String']['input'];
  year: Scalars['Float']['input'];
  zillow_link: Scalars['String']['input'];
  zip: Scalars['Float']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  createArticle: Article;
  createListing: Listing;
  createPost: Post;
  createVideo: Video;
  deleteArticle: Scalars['Boolean']['output'];
  deleteListing: Scalars['Boolean']['output'];
  deletePost: Scalars['Boolean']['output'];
  deleteVideo: Scalars['Boolean']['output'];
  forgotPassword: Scalars['Boolean']['output'];
  login: UserResponse;
  logout: Scalars['Boolean']['output'];
  register: UserResponse;
  signImages: SignedImageOutput;
  updateArticle?: Maybe<Article>;
  updateListing?: Maybe<Listing>;
  updatePost?: Maybe<Post>;
  updateVideo?: Maybe<Video>;
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type MutationCreateArticleArgs = {
  imageUrls: Array<Scalars['String']['input']>;
  input: ArticleInput;
};

export type MutationCreateListingArgs = {
  imageUrls: Array<Scalars['String']['input']>;
  input: ListingInput;
};

export type MutationCreatePostArgs = {
  imageUrls: Array<Scalars['String']['input']>;
  input: PostInput;
};

export type MutationCreateVideoArgs = {
  input: VideoInput;
};

export type MutationDeleteArticleArgs = {
  id: Scalars['Float']['input'];
};

export type MutationDeleteListingArgs = {
  id: Scalars['Float']['input'];
};

export type MutationDeletePostArgs = {
  id: Scalars['Float']['input'];
};

export type MutationDeleteVideoArgs = {
  id: Scalars['Float']['input'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};

export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  usernameOrEmail: Scalars['String']['input'];
};

export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

export type MutationSignImagesArgs = {
  imagePreviews: Array<Scalars['String']['input']>;
};

export type MutationUpdateArticleArgs = {
  id: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUpdateListingArgs = {
  id: Scalars['Int']['input'];
  street_address?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUpdatePostArgs = {
  id: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUpdateVideoArgs = {
  id: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PaginatedArticles = {
  __typename?: 'PaginatedArticles';
  articles: Array<Article>;
  creator: User;
  hasMore: Scalars['Boolean']['output'];
  hasPrevious: Scalars['Boolean']['output'];
};

export type PaginatedListings = {
  __typename?: 'PaginatedListings';
  creator: User;
  hasMore: Scalars['Boolean']['output'];
  hasPrevious: Scalars['Boolean']['output'];
  listings: Array<Listing>;
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  creator: User;
  hasMore: Scalars['Boolean']['output'];
  hasPrevious: Scalars['Boolean']['output'];
  posts: Array<Post>;
};

export type PaginatedVideo = {
  __typename?: 'PaginatedVideo';
  creator: User;
  hasMore: Scalars['Boolean']['output'];
  hasPrevious: Scalars['Boolean']['output'];
  videos: Array<Video>;
};

export type PaginationInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String']['output'];
  creator: User;
  creatorId: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  imageUrls?: Maybe<Array<Scalars['String']['output']>>;
  imageUrlsMedium?: Maybe<Array<Scalars['String']['output']>>;
  imageUrlsSmall?: Maybe<Array<Scalars['String']['output']>>;
  likes: Scalars['Float']['output'];
  text: Scalars['String']['output'];
  textSnippet: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type PostInput = {
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  Video?: Maybe<Video>;
  article?: Maybe<Article>;
  articles: PaginatedArticles;
  hello: Scalars['String']['output'];
  listing?: Maybe<Listing>;
  listings: PaginatedListings;
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: PaginatedPosts;
  userArticles: PaginatedArticles;
  userListing: PaginatedListings;
  userVideo: PaginatedVideo;
  userposts: PaginatedPosts;
  videos: PaginatedVideo;
};

export type QueryVideoArgs = {
  id: Scalars['Float']['input'];
};

export type QueryArticleArgs = {
  id: Scalars['Float']['input'];
};

export type QueryArticlesArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
};

export type QueryListingArgs = {
  id: Scalars['Float']['input'];
};

export type QueryListingsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
};

export type QueryPostArgs = {
  id: Scalars['Float']['input'];
};

export type QueryPostsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
};

export type QueryUserArticlesArgs = {
  pagination: PaginationInput;
  username: Scalars['String']['input'];
};

export type QueryUserListingArgs = {
  pagination: PaginationInput;
  username: Scalars['String']['input'];
};

export type QueryUserVideoArgs = {
  pagination: PaginationInput;
  username: Scalars['String']['input'];
};

export type QueryUserpostsArgs = {
  pagination: PaginationInput;
  username: Scalars['String']['input'];
};

export type QueryVideosArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
};

export type SignedImageOutput = {
  __typename?: 'SignedImageOutput';
  getObjectKeys: Array<Scalars['String']['output']>;
  imageUrls: Array<Scalars['String']['output']>;
  signedUrls: Array<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  facebook_url?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  instagram_url?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  realtor_url?: Maybe<Scalars['String']['output']>;
  redfin_url?: Maybe<Scalars['String']['output']>;
  twitter_url?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
  username: Scalars['String']['output'];
  youtube_url?: Maybe<Scalars['String']['output']>;
  zillow_url?: Maybe<Scalars['String']['output']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Video = {
  __typename?: 'Video';
  createdAt: Scalars['String']['output'];
  creator: User;
  creatorId: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  imageUrls?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  video_link?: Maybe<Scalars['String']['output']>;
};

export type VideoInput = {
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
  video_link: Scalars['String']['input'];
};

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;

export type ChangePasswordMutation = {
  __typename?: 'Mutation';
  changePassword: {
    __typename?: 'UserResponse';
    errors?: Array<{
      __typename?: 'FieldError';
      field: string;
      message: string;
    }> | null;
    user?: {
      __typename?: 'User';
      id: number;
      username: string;
      email: string;
    } | null;
  };
};

export type CreateArticleMutationVariables = Exact<{
  imageUrls: Array<Scalars['String']['input']> | Scalars['String']['input'];
  input: ArticleInput;
}>;

export type CreateArticleMutation = {
  __typename?: 'Mutation';
  createArticle: {
    __typename?: 'Article';
    body_1: string;
    body_2: string;
    body_3: string;
    createdAt: string;
    creatorId: number;
    id: number;
    imageUrls?: Array<string> | null;
    likes: number;
    title: string;
    updatedAt: string;
    creator: {
      __typename?: 'User';
      id: number;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type CreateListingMutationVariables = Exact<{
  imageUrls: Array<Scalars['String']['input']> | Scalars['String']['input'];
  input: ListingInput;
}>;

export type CreateListingMutation = {
  __typename?: 'Mutation';
  createListing: {
    __typename?: 'Listing';
    id: number;
    street_address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    zillow_link: string;
    has_sold: boolean;
    beds: number;
    bathrooms: number;
    square_footage: number;
    year: number;
    school_district: string;
    primary_school: string;
    secondary_school: string;
    tertiary_school: string;
    monthly_cost_30yr: string;
    monthly_cost_15yr: string;
    monthly_cost_10yr: string;
    monthly_cost_5yr: string;
    tags?: Array<string> | null;
    creatorId: number;
    imageUrls?: Array<string> | null;
    imageUrlsMedium?: Array<string> | null;
    imageUrlsSmall?: Array<string> | null;
    createdAt: string;
    updatedAt: string;
    creator: {
      __typename?: 'User';
      id: number;
      first_name?: string | null;
      last_name?: string | null;
      username: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
  imageUrls: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;

export type CreatePostMutation = {
  __typename?: 'Mutation';
  createPost: {
    __typename?: 'Post';
    id: number;
    title: string;
    text: string;
    creatorId: number;
    createdAt: string;
    updatedAt: string;
    likes: number;
    imageUrls?: Array<string> | null;
    creator: { __typename?: 'User'; id: number; username: string };
  };
};

export type CreateVideoMutationVariables = Exact<{
  input: VideoInput;
}>;

export type CreateVideoMutation = {
  __typename?: 'Mutation';
  createVideo: {
    __typename?: 'Video';
    id: number;
    title: string;
    video_link?: string | null;
    creatorId: number;
    imageUrls?: Array<string> | null;
    createdAt: string;
    updatedAt: string;
    creator: {
      __typename?: 'User';
      id: number;
      first_name?: string | null;
      last_name?: string | null;
      username: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type PostQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;

export type PostQuery = {
  __typename?: 'Query';
  post?: {
    __typename?: 'Post';
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    textSnippet: string;
    text: string;
    likes: number;
    creatorId: number;
    imageUrls?: Array<string> | null;
    creator: { __typename?: 'User'; id: number; username: string };
  } | null;
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;

export type ForgotPasswordMutation = {
  __typename?: 'Mutation';
  forgotPassword: boolean;
};

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'UserResponse';
    errors?: Array<{
      __typename?: 'FieldError';
      field: string;
      message: string;
    }> | null;
    user?: {
      __typename?: 'User';
      id: number;
      username: string;
      email: string;
    } | null;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean };

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  cursor: Scalars['String']['input'];
}>;

export type PostsQuery = {
  __typename?: 'Query';
  posts: {
    __typename?: 'PaginatedPosts';
    hasMore: boolean;
    hasPrevious: boolean;
    posts: Array<{
      __typename?: 'Post';
      id: number;
      createdAt: string;
      updatedAt: string;
      title: string;
      textSnippet: string;
      text: string;
      likes: number;
      creatorId: number;
      imageUrls?: Array<string> | null;
      creator: { __typename?: 'User'; id: number; username: string };
    }>;
  };
};

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'UserResponse';
    errors?: Array<{
      __typename?: 'FieldError';
      field: string;
      message: string;
    }> | null;
    user?: {
      __typename?: 'User';
      id: number;
      username: string;
      email: string;
    } | null;
  };
};

export type SignImagesMutationVariables = Exact<{
  imagePreviews: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;

export type SignImagesMutation = {
  __typename?: 'Mutation';
  signImages: {
    __typename?: 'SignedImageOutput';
    getObjectKeys: Array<string>;
    signedUrls: Array<string>;
    imageUrls: Array<string>;
  };
};

export type UserPostsQueryVariables = Exact<{
  username: Scalars['String']['input'];
  pagination: PaginationInput;
}>;

export type UserPostsQuery = {
  __typename?: 'Query';
  userposts: {
    __typename?: 'PaginatedPosts';
    hasPrevious: boolean;
    hasMore: boolean;
    posts: Array<{
      __typename?: 'Post';
      id: number;
      title: string;
      text: string;
      createdAt: string;
      updatedAt: string;
      creator: { __typename?: 'User'; id: number; username: string };
    }>;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me?: { __typename?: 'User'; id: number; username: string } | null;
};

export const ChangePasswordDocument = gql`
  mutation ChangePassword($token: String!, $newPassword: String!) {
    changePassword(token: $token, newPassword: $newPassword) {
      errors {
        field
        message
      }
      user {
        id
        username
        email
      }
    }
  }
`;

export function useChangePasswordMutation() {
  return Urql.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument);
}
export const CreateArticleDocument = gql`
  mutation createArticle($imageUrls: [String!]!, $input: ArticleInput!) {
    createArticle(imageUrls: $imageUrls, input: $input) {
      body_1
      body_2
      body_3
      creator {
        id
        createdAt
        updatedAt
      }
      createdAt
      creatorId
      id
      imageUrls
      likes
      title
      updatedAt
    }
  }
`;

export function useCreateArticleMutation() {
  return Urql.useMutation<
    CreateArticleMutation,
    CreateArticleMutationVariables
  >(CreateArticleDocument);
}
export const CreateListingDocument = gql`
  mutation createListing($imageUrls: [String!]!, $input: ListingInput!) {
    createListing(imageUrls: $imageUrls, input: $input) {
      id
      street_address
      city
      state
      zip
      country
      zillow_link
      has_sold
      beds
      bathrooms
      square_footage
      year
      school_district
      primary_school
      secondary_school
      tertiary_school
      monthly_cost_30yr
      monthly_cost_15yr
      monthly_cost_10yr
      monthly_cost_5yr
      tags
      creatorId
      imageUrls
      imageUrlsMedium
      imageUrlsSmall
      createdAt
      updatedAt
      creator {
        id
        first_name
        last_name
        username
        email
        createdAt
        updatedAt
      }
    }
  }
`;

export function useCreateListingMutation() {
  return Urql.useMutation<
    CreateListingMutation,
    CreateListingMutationVariables
  >(CreateListingDocument);
}
export const CreatePostDocument = gql`
  mutation createPost($input: PostInput!, $imageUrls: [String!]!) {
    createPost(input: $input, imageUrls: $imageUrls) {
      id
      title
      text
      creatorId
      createdAt
      updatedAt
      likes
      imageUrls
      creator {
        id
        username
      }
    }
  }
`;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument
  );
}
export const CreateVideoDocument = gql`
  mutation createVideo($input: VideoInput!) {
    createVideo(input: $input) {
      id
      title
      video_link
      creatorId
      creator {
        id
        first_name
        last_name
        username
        email
        createdAt
        updatedAt
      }
      imageUrls
      createdAt
      updatedAt
    }
  }
`;

export function useCreateVideoMutation() {
  return Urql.useMutation<CreateVideoMutation, CreateVideoMutationVariables>(
    CreateVideoDocument
  );
}
export const PostDocument = gql`
  query Post($id: Float!) {
    post(id: $id) {
      id
      createdAt
      updatedAt
      title
      textSnippet
      text
      likes
      creatorId
      imageUrls
      creator {
        id
        username
      }
    }
  }
`;

export function usePostQuery(
  options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'>
) {
  return Urql.useQuery<PostQuery, PostQueryVariables>({
    query: PostDocument,
    ...options,
  });
}
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export function useForgotPasswordMutation() {
  return Urql.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument);
}
export const LoginDocument = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      errors {
        field
        message
      }
      user {
        id
        username
        email
      }
    }
  }
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument
  );
}
export const PostsDocument = gql`
  query Posts($limit: Int!, $cursor: String!) {
    posts(limit: $limit, cursor: $cursor) {
      hasMore
      hasPrevious
      posts {
        id
        createdAt
        updatedAt
        title
        textSnippet
        text
        likes
        creatorId
        imageUrls
        creator {
          id
          username
        }
      }
    }
  }
`;

export function usePostsQuery(
  options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>
) {
  return Urql.useQuery<PostsQuery, PostsQueryVariables>({
    query: PostsDocument,
    ...options,
  });
}
export const RegisterDocument = gql`
  mutation Register($options: UsernamePasswordInput!) {
    register(options: $options) {
      errors {
        field
        message
      }
      user {
        id
        username
        email
      }
    }
  }
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}
export const SignImagesDocument = gql`
  mutation signImages($imagePreviews: [String!]!) {
    signImages(imagePreviews: $imagePreviews) {
      getObjectKeys
      signedUrls
      imageUrls
    }
  }
`;

export function useSignImagesMutation() {
  return Urql.useMutation<SignImagesMutation, SignImagesMutationVariables>(
    SignImagesDocument
  );
}
export const UserPostsDocument = gql`
  query userPosts($username: String!, $pagination: PaginationInput!) {
    userposts(username: $username, pagination: $pagination) {
      posts {
        id
        title
        text
        createdAt
        updatedAt
        creator {
          id
          username
        }
      }
      hasPrevious
      hasMore
    }
  }
`;

export function useUserPostsQuery(
  options: Omit<Urql.UseQueryArgs<UserPostsQueryVariables>, 'query'>
) {
  return Urql.useQuery<UserPostsQuery, UserPostsQueryVariables>({
    query: UserPostsDocument,
    ...options,
  });
}
export const MeDocument = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

export function useMeQuery(
  options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>
) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({
    query: MeDocument,
    ...options,
  });
}
