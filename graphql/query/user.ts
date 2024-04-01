import {graphql} from '../../gql'

export const verifyGoogleTokenQuery= graphql(`#graphql

    query VerifyUserGoogleToken($token: String!) {
        verifyGoogleToken(token: $token)
    }
`)

export const getCurrentUserQuery= graphql(`#graphql
    query GetCurrentUser{
        getCurrentUser{
            id
            profileImageUrl
            email 
            firstName
            lastName

        }
    }
`)

export const getUserByIdQuery= graphql(`#graphql
    query GetUserById($getUserByIdId: String!) {
        getUserById(id: $getUserByIdId) {
        firstName
        lastName
        id
        profileImageUrl
        tweets {
            id
            content
            imageUrl
            author {
                id
                firstName
                lastName
                profileImageUrl
            }
        }
        }
    }

`)