import { graphql } from "../../gql";

export const createTweetMutation = graphql(`
  #graphql
  mutation CreateTweet($payload: CreateTweetInput!) {
    createTweet(payload: $payload) {
      id
    }
  }
`);

export const deleteTweetMutation = graphql(`
  #graphql
  mutation DeleteTweet($id: String!) {
    deleteTweet(id: $id)
  }
`);

export const likeTweetMutation = graphql(`
  #graphql
  mutation LikeTweet($likeTweetId: String!) {
    likeTweet(id: $likeTweetId) {
      tweet {
        id
      }
    }
  }
`);

export const unlikeTweetMutation = graphql(`
  #graphql
  mutation UnlikeTweet($unlikeTweetId: String!) {
    unlikeTweet(id: $unlikeTweetId)
  }
`);
