/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n      email\n    }\n  }\n}": types.ChangePasswordtest2,
    "mutation createArticle($imageUrls: [String!]!, $input: ArticleInput!) {\n  createArticle(imageUrls: $imageUrls, input: $input) {\n    body_1\n    body_2\n    body_3\n    creator {\n      id\n      createdAt\n      updatedAt\n    }\n    createdAt\n    creatorId\n    id\n    imageUrls\n    likes\n    title\n    updatedAt\n  }\n}": types.CreateArticletest2,
    "mutation createListing($imageUrls: [String!]!, $input: ListingInput!) {\n  createListing(imageUrls: $imageUrls, input: $input) {\n    id\n    street_address\n    city\n    state\n    zip\n    country\n    zillow_link\n    has_sold\n    beds\n    bathrooms\n    square_footage\n    year\n    school_district\n    primary_school\n    secondary_school\n    tertiary_school\n    monthly_cost_30yr\n    monthly_cost_15yr\n    monthly_cost_10yr\n    monthly_cost_5yr\n    tags\n    creatorId\n    imageUrls\n    imageUrlsMedium\n    imageUrlsSmall\n    createdAt\n    updatedAt\n    creator {\n      id\n      first_name\n      last_name\n      username\n      email\n      createdAt\n      updatedAt\n    }\n  }\n}": types.CreateListingtest2,
    "mutation createPost($input: PostInput!, $imageUrls: [String!]!) {\n  createPost(input: $input, imageUrls: $imageUrls) {\n    id\n    title\n    text\n    creatorId\n    createdAt\n    updatedAt\n    likes\n    imageUrls\n    creator {\n      id\n      username\n    }\n  }\n}": types.CreatePosttest2,
    "mutation createVideo($input: VideoInput!) {\n  createVideo(input: $input) {\n    id\n    title\n    video_link\n    creatorId\n    creator {\n      id\n      first_name\n      last_name\n      username\n      email\n      createdAt\n      updatedAt\n    }\n    imageUrls\n    createdAt\n    updatedAt\n  }\n}": types.CreateVideotest2,
    "query Post($id: Float!) {\n  post(id: $id) {\n    id\n    createdAt\n    updatedAt\n    title\n    textSnippet\n    text\n    likes\n    creatorId\n    imageUrls\n    creator {\n      id\n      username\n    }\n  }\n}": types.Posttest2,
    "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}": types.ForgotPasswordtest2,
    "mutation Login($usernameOrEmail: String!, $password: String!) {\n  login(usernameOrEmail: $usernameOrEmail, password: $password) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n      email\n    }\n  }\n}": types.Logintest2,
    "mutation Logout {\n  logout\n}": types.Logouttest2,
    "query Posts($limit: Int!, $cursor: String!) {\n  posts(limit: $limit, cursor: $cursor) {\n    hasMore\n    hasPrevious\n    posts {\n      id\n      createdAt\n      updatedAt\n      title\n      textSnippet\n      text\n      likes\n      creatorId\n      imageUrls\n      creator {\n        id\n        username\n      }\n    }\n  }\n}": types.Poststest2,
    "mutation Register($options: UsernamePasswordInput!) {\n  register(options: $options) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n      email\n    }\n  }\n}": types.Registertest2,
    "mutation signImages($imagePreviews: [String!]!) {\n  signImages(imagePreviews: $imagePreviews) {\n    getObjectKeys\n    signedUrls\n    imageUrls\n  }\n}": types.SignImagestest2,
    "query userPosts($username: String!, $pagination: PaginationInput!) {\n  userposts(username: $username, pagination: $pagination) {\n    posts {\n      id\n      title\n      text\n      createdAt\n      updatedAt\n      creator {\n        id\n        username\n      }\n    }\n    hasPrevious\n    hasMore\n  }\n}": types.UserPoststest2,
    "query Me {\n  me {\n    id\n    username\n  }\n}": types.Metest2,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n      email\n    }\n  }\n}"): (typeof documents)["mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n      email\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createArticle($imageUrls: [String!]!, $input: ArticleInput!) {\n  createArticle(imageUrls: $imageUrls, input: $input) {\n    body_1\n    body_2\n    body_3\n    creator {\n      id\n      createdAt\n      updatedAt\n    }\n    createdAt\n    creatorId\n    id\n    imageUrls\n    likes\n    title\n    updatedAt\n  }\n}"): (typeof documents)["mutation createArticle($imageUrls: [String!]!, $input: ArticleInput!) {\n  createArticle(imageUrls: $imageUrls, input: $input) {\n    body_1\n    body_2\n    body_3\n    creator {\n      id\n      createdAt\n      updatedAt\n    }\n    createdAt\n    creatorId\n    id\n    imageUrls\n    likes\n    title\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createListing($imageUrls: [String!]!, $input: ListingInput!) {\n  createListing(imageUrls: $imageUrls, input: $input) {\n    id\n    street_address\n    city\n    state\n    zip\n    country\n    zillow_link\n    has_sold\n    beds\n    bathrooms\n    square_footage\n    year\n    school_district\n    primary_school\n    secondary_school\n    tertiary_school\n    monthly_cost_30yr\n    monthly_cost_15yr\n    monthly_cost_10yr\n    monthly_cost_5yr\n    tags\n    creatorId\n    imageUrls\n    imageUrlsMedium\n    imageUrlsSmall\n    createdAt\n    updatedAt\n    creator {\n      id\n      first_name\n      last_name\n      username\n      email\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["mutation createListing($imageUrls: [String!]!, $input: ListingInput!) {\n  createListing(imageUrls: $imageUrls, input: $input) {\n    id\n    street_address\n    city\n    state\n    zip\n    country\n    zillow_link\n    has_sold\n    beds\n    bathrooms\n    square_footage\n    year\n    school_district\n    primary_school\n    secondary_school\n    tertiary_school\n    monthly_cost_30yr\n    monthly_cost_15yr\n    monthly_cost_10yr\n    monthly_cost_5yr\n    tags\n    creatorId\n    imageUrls\n    imageUrlsMedium\n    imageUrlsSmall\n    createdAt\n    updatedAt\n    creator {\n      id\n      first_name\n      last_name\n      username\n      email\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createPost($input: PostInput!, $imageUrls: [String!]!) {\n  createPost(input: $input, imageUrls: $imageUrls) {\n    id\n    title\n    text\n    creatorId\n    createdAt\n    updatedAt\n    likes\n    imageUrls\n    creator {\n      id\n      username\n    }\n  }\n}"): (typeof documents)["mutation createPost($input: PostInput!, $imageUrls: [String!]!) {\n  createPost(input: $input, imageUrls: $imageUrls) {\n    id\n    title\n    text\n    creatorId\n    createdAt\n    updatedAt\n    likes\n    imageUrls\n    creator {\n      id\n      username\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createVideo($input: VideoInput!) {\n  createVideo(input: $input) {\n    id\n    title\n    video_link\n    creatorId\n    creator {\n      id\n      first_name\n      last_name\n      username\n      email\n      createdAt\n      updatedAt\n    }\n    imageUrls\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["mutation createVideo($input: VideoInput!) {\n  createVideo(input: $input) {\n    id\n    title\n    video_link\n    creatorId\n    creator {\n      id\n      first_name\n      last_name\n      username\n      email\n      createdAt\n      updatedAt\n    }\n    imageUrls\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Post($id: Float!) {\n  post(id: $id) {\n    id\n    createdAt\n    updatedAt\n    title\n    textSnippet\n    text\n    likes\n    creatorId\n    imageUrls\n    creator {\n      id\n      username\n    }\n  }\n}"): (typeof documents)["query Post($id: Float!) {\n  post(id: $id) {\n    id\n    createdAt\n    updatedAt\n    title\n    textSnippet\n    text\n    likes\n    creatorId\n    imageUrls\n    creator {\n      id\n      username\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"): (typeof documents)["mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($usernameOrEmail: String!, $password: String!) {\n  login(usernameOrEmail: $usernameOrEmail, password: $password) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n      email\n    }\n  }\n}"): (typeof documents)["mutation Login($usernameOrEmail: String!, $password: String!) {\n  login(usernameOrEmail: $usernameOrEmail, password: $password) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n      email\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Posts($limit: Int!, $cursor: String!) {\n  posts(limit: $limit, cursor: $cursor) {\n    hasMore\n    hasPrevious\n    posts {\n      id\n      createdAt\n      updatedAt\n      title\n      textSnippet\n      text\n      likes\n      creatorId\n      imageUrls\n      creator {\n        id\n        username\n      }\n    }\n  }\n}"): (typeof documents)["query Posts($limit: Int!, $cursor: String!) {\n  posts(limit: $limit, cursor: $cursor) {\n    hasMore\n    hasPrevious\n    posts {\n      id\n      createdAt\n      updatedAt\n      title\n      textSnippet\n      text\n      likes\n      creatorId\n      imageUrls\n      creator {\n        id\n        username\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($options: UsernamePasswordInput!) {\n  register(options: $options) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n      email\n    }\n  }\n}"): (typeof documents)["mutation Register($options: UsernamePasswordInput!) {\n  register(options: $options) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n      email\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation signImages($imagePreviews: [String!]!) {\n  signImages(imagePreviews: $imagePreviews) {\n    getObjectKeys\n    signedUrls\n    imageUrls\n  }\n}"): (typeof documents)["mutation signImages($imagePreviews: [String!]!) {\n  signImages(imagePreviews: $imagePreviews) {\n    getObjectKeys\n    signedUrls\n    imageUrls\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query userPosts($username: String!, $pagination: PaginationInput!) {\n  userposts(username: $username, pagination: $pagination) {\n    posts {\n      id\n      title\n      text\n      createdAt\n      updatedAt\n      creator {\n        id\n        username\n      }\n    }\n    hasPrevious\n    hasMore\n  }\n}"): (typeof documents)["query userPosts($username: String!, $pagination: PaginationInput!) {\n  userposts(username: $username, pagination: $pagination) {\n    posts {\n      id\n      title\n      text\n      createdAt\n      updatedAt\n      creator {\n        id\n        username\n      }\n    }\n    hasPrevious\n    hasMore\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    id\n    username\n  }\n}"): (typeof documents)["query Me {\n  me {\n    id\n    username\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;