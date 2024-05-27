import {useQuery}  from "@tanstack/react-query"
import {getCurrentUserQuery, getUserByIdQuery} from "../graphql/query/user"
import graphqlClient from "../services/api"
import { GraphQLClient } from "graphql-request";

export const useCurrentUser = () => {
    const query = useQuery({
      queryKey: ['current-user'],
      queryFn: async () => {
        const gqlClient = new GraphQLClient(import.meta.env.VITE_API_URL as string, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`
          }
        });
        return await gqlClient.request(getCurrentUserQuery);
      }
    });
  
    return {...query, user: query.data?.getCurrentUser};
  }
  

export const useGetUserById= (id: string)=> {
    const query= useQuery({
        queryKey: ['user', id],
        queryFn: async ()=> await graphqlClient.request(getUserByIdQuery, {getUserByIdId: id}),
    })

    return {...query, userInfo: query.data?.getUserById}
}

