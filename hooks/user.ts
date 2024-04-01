import {useQuery}  from "@tanstack/react-query"
import {getCurrentUserQuery, getUserByIdQuery} from "../graphql/query/user"
import graphqlClient from "../services/api"

export const useCurrentUser= ()=> {
    const query= useQuery({
        queryKey: ['current-user'],
        queryFn: async ()=> await graphqlClient.request(getCurrentUserQuery),
    })

    return {...query, user: query.data?.getCurrentUser}
}

export const useGetUserById= (id: string)=> {
    const query= useQuery({
        queryKey: ['user', id],
        queryFn: async ()=> await graphqlClient.request(getUserByIdQuery, {getUserByIdId: id}),
    })

    return {...query, userInfo: query.data?.getUserById}
}

