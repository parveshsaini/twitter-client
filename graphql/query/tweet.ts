import {graphql} from '../../gql'


export const getAllTweetsQuery= graphql(`#graphql

    query GetAllTweets {
        getAllTweets{
            id
            content
            imageUrl
            author {
                id
                firstName
                lastName
                profileImageUrl
            }
            likes {
                user {
                    id
                }
            }
        }
    }
`) 


export const getSignedUrlQuery= graphql(`#graphql
    query GetSignedUrl($imageName: String!, $imageType: String!) {
        getSignedUrl(imageName: $imageName, imageType: $imageType)
    }
`)