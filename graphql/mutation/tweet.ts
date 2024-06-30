import {graphql} from '../../gql'


export const createTweetMutation= graphql(`#graphql
    mutation CreateTweet($payload: CreateTweetInput!) {
        createTweet(payload: $payload){
            id
        }
    }
`)

export const deleteTweetMutation= graphql(`#graphql
    mutation DeleteTweet($id: String!) {
        deleteTweet(id: $id)
    }
`)