import { GraphQLClient } from 'graphql-request'

const graphqlClient= new GraphQLClient('http://localhost:3000/graphql', {
    headers: {
        Authorization: `Bearer ${window.localStorage.getItem('__twitter_token')}`
    }
})

export default graphqlClient
