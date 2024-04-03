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

            recommendedUsers{
                id
                firstName
                lastName
                profileImageUrl
            }

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
            
        followers{
            id
            firstName
            lastName
            profileImageUrl
        }
        following{
            id
            firstName
            lastName
            profileImageUrl
        }
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