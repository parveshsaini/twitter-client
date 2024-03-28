import {useQuery}  from "@tanstack/react-query"
import {getCurrentUserQuery} from "../graphql/query/user"
import graphqlClient from "../services/api"

export const useCurrentUser= ()=> {
    const query= useQuery({
        queryKey: ['current-user'],
        queryFn: async ()=> await graphqlClient.request(getCurrentUserQuery),
    })

    return {...query, user: query.data?.getCurrentUser}
}

