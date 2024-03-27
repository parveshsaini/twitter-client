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