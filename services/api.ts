import { GraphQLClient } from 'graphql-request'

const graphqlClient= new GraphQLClient(import.meta.env.VITE_API_URL as string, {
    headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
    }
})

export default graphqlClient

