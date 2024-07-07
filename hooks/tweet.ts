import {useMutation, useQuery, useQueryClient}  from "@tanstack/react-query"
import graphqlClient from "../services/api"
import { getAllTweetsQuery } from "../graphql/query/tweet"
import { createTweetMutation, deleteTweetMutation, likeTweetMutation, unlikeTweetMutation } from "../graphql/mutation/tweet"
import { CreateTweetInput } from "../gql/graphql"
import toast from "react-hot-toast"
import { GraphQLClient } from "graphql-request"



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
            toast.success("Deleted Successfully", { id: "1" })
            // window.location.reload()
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

        onError: ()=> toast.error("Please wait 10 secs trying again", { id: "1" })

    })

    return mutation
}

export const useLikeTweet= ()=> {
    const queryClient= useQueryClient()

    const mutation= useMutation({
        mutationFn: async (id: string)=> {
            const gqlClient = new GraphQLClient(import.meta.env.VITE_API_URL as string, {
                headers: {
                  Authorization: `Bearer ${window.localStorage.getItem('token')}`
                }
              });
            await gqlClient.request(likeTweetMutation, {likeTweetId: id})
        },
        onMutate: () => toast.loading("Liking Tweet", { id: "1" }),

        onSuccess: ()=>{
            queryClient.invalidateQueries({ queryKey: ['tweets'] })
            toast.success("Liked Success", { id: "1" })
        }
    })

    return mutation
}

export const useUnlikeTweet= ()=> {
    const queryClient= useQueryClient()

    const mutation= useMutation({
        mutationFn: async (id: string)=> {
            const gqlClient = new GraphQLClient(import.meta.env.VITE_API_URL as string, {
                headers: {
                  Authorization: `Bearer ${window.localStorage.getItem('token')}`
                }
              });
            await gqlClient.request(unlikeTweetMutation, {unlikeTweetId: id})
        },
        onMutate: () => toast.loading("Unliking Tweet", { id: "1" }),

        onSuccess: ()=>{
            queryClient.invalidateQueries({ queryKey: ['tweets'] })
            toast.success("Unliked Success", { id: "1" })
        }
    })

    return mutation
}