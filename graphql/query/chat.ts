import {graphql} from '../../gql'

export const getUsersForSidebarQuery= graphql(`#graphql
    query GetUsersForSidebar {
        getUsersForSidebar {
            id
            firstName
            lastName
            profileImageUrl
        }
    }
`)

export const getMessagesQuery= graphql(`#graphql
    query GetMessages($chattingUserId: ID!) {
        getMessages(chattingUserId: $chattingUserId) {
            id
            body
            createdAt
            sender {
                id
                firstName
                lastName
            }
        }
    }
`)