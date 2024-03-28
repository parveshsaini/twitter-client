import {useMutation, useQuery, useQueryClient}  from "@tanstack/react-query"
import graphqlClient from "../services/api"
import { getAllTweetsQuery } from "../graphql/query/tweet"
import { createTweetMutation } from "../graphql/mutation/tweet"
import { CreateTweetInput } from "../gql/graphql"
import toast from "react-hot-toast"

export const useGetAllTweets = ()=> {
    const query= useQuery({
        queryKey: ['tweets'],
        queryFn: async ()=> await graphqlClient.request(getAllTweetsQuery)
    })

    return {...query, tweets: query.data?.getAllTweets}
}

export const useCreateTweet= ()=> {
    const queryClient= useQueryClient()

    const mutation= useMutation({
        mutationFn: async (payload: CreateTweetInput)=> {
            await graphqlClient.request(createTweetMutation, {payload})
        },
        onMutate: () => toast.loading("Creating Tweet", { id: "1" }),

        onSuccess: ()=>{
            queryClient.invalidateQueries({ queryKey: ['tweets'] })
            toast.success("Created Success", { id: "1" })
        },

    })

    return mutation
}