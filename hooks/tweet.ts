import {useMutation, useQuery, useQueryClient}  from "@tanstack/react-query"
import graphqlClient from "../services/api"
import { getAllTweetsQuery } from "../graphql/query/tweet"
import { createTweetMutation, deleteTweetMutation } from "../graphql/mutation/tweet"
import { CreateTweetInput } from "../gql/graphql"
import toast from "react-hot-toast"

export const useGetAllTweets = ()=> {
    const query= useQuery({
        queryKey: ['tweets'],
        queryFn: async ()=> await graphqlClient.request(getAllTweetsQuery)
    })

    return {...query, tweets: query.data?.getAllTweets}
}

export const useDeleteTweet= ()=>{
    const queryClient= useQueryClient()

    const mutation= useMutation({
        mutationFn: async (id: string)=> {
            await graphqlClient.request(deleteTweetMutation, {id})
        },
        onMutate: () => toast.loading("Deleting Tweet", { id: "1" }),

        onSuccess: ()=> {
            queryClient.invalidateQueries({ queryKey: ['tweets'] })
            toast.success("Deleted Success", { id: "1" })
            window.location.reload()
        },
    })

    return mutation
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

        onError: ()=> toast.error("Please wait before trying again", { id: "1" })

    })

    return mutation
}