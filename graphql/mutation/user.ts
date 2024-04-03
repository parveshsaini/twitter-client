import {graphql} from '../../gql'

export const FollowUserMutations= graphql(`#graphql
    mutation FollowUser($to: String!){
        followUser(to: $to)
    }
`)

export const UnfollowUserMutations= graphql(`#graphql
    mutation UnfollowUser($to: String!){
        unfollowUser(to: $to)
    }
`)