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
    "#graphql\n    mutation SendMessage($payload: SendMessageInput!) {\n        sendMessage(payload: $payload) {\n            body\n            id\n            createdAt\n        }\n    }\n": types.SendMessageDocument,
    "\n  #graphql\n  mutation CreateTweet($payload: CreateTweetInput!) {\n    createTweet(payload: $payload) {\n      id\n    }\n  }\n": types.CreateTweetDocument,
    "\n  #graphql\n  mutation DeleteTweet($id: String!) {\n    deleteTweet(id: $id)\n  }\n": types.DeleteTweetDocument,
    "\n  #graphql\n  mutation LikeTweet($likeTweetId: String!) {\n    likeTweet(id: $likeTweetId) {\n      tweet {\n        id\n      }\n    }\n  }\n": types.LikeTweetDocument,
    "\n  #graphql\n  mutation UnlikeTweet($unlikeTweetId: String!) {\n    unlikeTweet(id: $unlikeTweetId)\n  }\n": types.UnlikeTweetDocument,
    "#graphql\n    mutation FollowUser($to: String!){\n        followUser(to: $to)\n    }\n": types.FollowUserDocument,
    "#graphql\n    mutation UnfollowUser($to: String!){\n        unfollowUser(to: $to)\n    }\n": types.UnfollowUserDocument,
    "#graphql\n    query GetUsersForSidebar {\n        getUsersForSidebar {\n            id\n            firstName\n            lastName\n            profileImageUrl\n        }\n    }\n": types.GetUsersForSidebarDocument,
    "#graphql\n    query GetMessages($chattingUserId: ID!) {\n        getMessages(chattingUserId: $chattingUserId) {\n            id\n            body\n            createdAt\n            sender {\n                id\n                firstName\n                lastName\n            }\n        }\n    }\n": types.GetMessagesDocument,
    "#graphql\n\n    query GetAllTweets {\n        getAllTweets{\n            id\n            content\n            imageUrl\n            author {\n                id\n                firstName\n                lastName\n                profileImageUrl\n            }\n            likes {\n                user {\n                    id\n                }\n            }\n        }\n    }\n": types.GetAllTweetsDocument,
    "#graphql\n    query GetSignedUrl($imageName: String!, $imageType: String!) {\n        getSignedUrl(imageName: $imageName, imageType: $imageType)\n    }\n": types.GetSignedUrlDocument,
    "#graphql\n\n    query VerifyUserGoogleToken($token: String!) {\n        verifyGoogleToken(token: $token)\n    }\n": types.VerifyUserGoogleTokenDocument,
    "#graphql\n    query GetCurrentUser{\n        getCurrentUser{\n            id\n            profileImageUrl\n            email \n            firstName\n            lastName\n\n            likes {\n                tweet {\n                    id\n                }\n            }\n\n            recommendedUsers{\n                id\n                firstName\n                lastName\n                profileImageUrl\n            }\n\n        }\n    }\n": types.GetCurrentUserDocument,
    "#graphql\n    query GetUserById($getUserByIdId: String!) {\n        getUserById(id: $getUserByIdId) {\n        firstName\n        lastName\n        id\n        profileImageUrl\n\n        likes {\n            tweet {\n                id\n            }\n        }\n            \n        followers{\n            id\n            firstName\n            lastName\n            profileImageUrl\n        }\n        following{\n            id\n            firstName\n            lastName\n            profileImageUrl\n        }\n        tweets {\n            id\n            content\n            imageUrl\n            author {\n                id\n                firstName\n                lastName\n                profileImageUrl\n            }\n            likes {\n                user {\n                    id\n                }\n            }\n        }\n        }\n    }\n\n": types.GetUserByIdDocument,
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
export function graphql(source: "#graphql\n    mutation SendMessage($payload: SendMessageInput!) {\n        sendMessage(payload: $payload) {\n            body\n            id\n            createdAt\n        }\n    }\n"): (typeof documents)["#graphql\n    mutation SendMessage($payload: SendMessageInput!) {\n        sendMessage(payload: $payload) {\n            body\n            id\n            createdAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation CreateTweet($payload: CreateTweetInput!) {\n    createTweet(payload: $payload) {\n      id\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  mutation CreateTweet($payload: CreateTweetInput!) {\n    createTweet(payload: $payload) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation DeleteTweet($id: String!) {\n    deleteTweet(id: $id)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation DeleteTweet($id: String!) {\n    deleteTweet(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation LikeTweet($likeTweetId: String!) {\n    likeTweet(id: $likeTweetId) {\n      tweet {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  mutation LikeTweet($likeTweetId: String!) {\n    likeTweet(id: $likeTweetId) {\n      tweet {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation UnlikeTweet($unlikeTweetId: String!) {\n    unlikeTweet(id: $unlikeTweetId)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation UnlikeTweet($unlikeTweetId: String!) {\n    unlikeTweet(id: $unlikeTweetId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation FollowUser($to: String!){\n        followUser(to: $to)\n    }\n"): (typeof documents)["#graphql\n    mutation FollowUser($to: String!){\n        followUser(to: $to)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation UnfollowUser($to: String!){\n        unfollowUser(to: $to)\n    }\n"): (typeof documents)["#graphql\n    mutation UnfollowUser($to: String!){\n        unfollowUser(to: $to)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query GetUsersForSidebar {\n        getUsersForSidebar {\n            id\n            firstName\n            lastName\n            profileImageUrl\n        }\n    }\n"): (typeof documents)["#graphql\n    query GetUsersForSidebar {\n        getUsersForSidebar {\n            id\n            firstName\n            lastName\n            profileImageUrl\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query GetMessages($chattingUserId: ID!) {\n        getMessages(chattingUserId: $chattingUserId) {\n            id\n            body\n            createdAt\n            sender {\n                id\n                firstName\n                lastName\n            }\n        }\n    }\n"): (typeof documents)["#graphql\n    query GetMessages($chattingUserId: ID!) {\n        getMessages(chattingUserId: $chattingUserId) {\n            id\n            body\n            createdAt\n            sender {\n                id\n                firstName\n                lastName\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n\n    query GetAllTweets {\n        getAllTweets{\n            id\n            content\n            imageUrl\n            author {\n                id\n                firstName\n                lastName\n                profileImageUrl\n            }\n            likes {\n                user {\n                    id\n                }\n            }\n        }\n    }\n"): (typeof documents)["#graphql\n\n    query GetAllTweets {\n        getAllTweets{\n            id\n            content\n            imageUrl\n            author {\n                id\n                firstName\n                lastName\n                profileImageUrl\n            }\n            likes {\n                user {\n                    id\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query GetSignedUrl($imageName: String!, $imageType: String!) {\n        getSignedUrl(imageName: $imageName, imageType: $imageType)\n    }\n"): (typeof documents)["#graphql\n    query GetSignedUrl($imageName: String!, $imageType: String!) {\n        getSignedUrl(imageName: $imageName, imageType: $imageType)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n\n    query VerifyUserGoogleToken($token: String!) {\n        verifyGoogleToken(token: $token)\n    }\n"): (typeof documents)["#graphql\n\n    query VerifyUserGoogleToken($token: String!) {\n        verifyGoogleToken(token: $token)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query GetCurrentUser{\n        getCurrentUser{\n            id\n            profileImageUrl\n            email \n            firstName\n            lastName\n\n            likes {\n                tweet {\n                    id\n                }\n            }\n\n            recommendedUsers{\n                id\n                firstName\n                lastName\n                profileImageUrl\n            }\n\n        }\n    }\n"): (typeof documents)["#graphql\n    query GetCurrentUser{\n        getCurrentUser{\n            id\n            profileImageUrl\n            email \n            firstName\n            lastName\n\n            likes {\n                tweet {\n                    id\n                }\n            }\n\n            recommendedUsers{\n                id\n                firstName\n                lastName\n                profileImageUrl\n            }\n\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query GetUserById($getUserByIdId: String!) {\n        getUserById(id: $getUserByIdId) {\n        firstName\n        lastName\n        id\n        profileImageUrl\n\n        likes {\n            tweet {\n                id\n            }\n        }\n            \n        followers{\n            id\n            firstName\n            lastName\n            profileImageUrl\n        }\n        following{\n            id\n            firstName\n            lastName\n            profileImageUrl\n        }\n        tweets {\n            id\n            content\n            imageUrl\n            author {\n                id\n                firstName\n                lastName\n                profileImageUrl\n            }\n            likes {\n                user {\n                    id\n                }\n            }\n        }\n        }\n    }\n\n"): (typeof documents)["#graphql\n    query GetUserById($getUserByIdId: String!) {\n        getUserById(id: $getUserByIdId) {\n        firstName\n        lastName\n        id\n        profileImageUrl\n\n        likes {\n            tweet {\n                id\n            }\n        }\n            \n        followers{\n            id\n            firstName\n            lastName\n            profileImageUrl\n        }\n        following{\n            id\n            firstName\n            lastName\n            profileImageUrl\n        }\n        tweets {\n            id\n            content\n            imageUrl\n            author {\n                id\n                firstName\n                lastName\n                profileImageUrl\n            }\n            likes {\n                user {\n                    id\n                }\n            }\n        }\n        }\n    }\n\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;