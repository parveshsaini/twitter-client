/* eslint-disable @typescript-eslint/no-unused-vars */

import {useMutation, useQuery, useQueryClient}  from "@tanstack/react-query"
import graphqlClient from "../services/api"
import { getMessagesQuery, getUsersForSidebarQuery } from "../graphql/query/chat";
import { ConversationType, MessageType, useConversation } from "../zustand/useConversation";

import { useEffect, useState } from "react";
import { SendMessageInput } from "../gql/graphql";
import { sendMessageMutation } from "../graphql/mutation/chat"


export const useGetConversations = ()=> {
    const [conversations, setConversations] = useState<ConversationType[]>([]);

    const query= useQuery({
        queryKey: ['conversations'],
        queryFn: async ()=> graphqlClient.request(getUsersForSidebarQuery).then((data)=> setConversations(data.getUsersForSidebar ? data.getUsersForSidebar : [])).catch((error)=> console.error(error))

    })

    // setConversations(query.data?.getUsersForSidebar)

    return {...query, conversations: conversations}
}

export const useGetMessages = () => {
    const { messages, setMessages, selectedConversation } = useConversation();
  
    const query = useQuery({
      queryKey: ['messages', selectedConversation?.id],
      queryFn: async () => {
        if (!selectedConversation?.id) return [];
        const data = await graphqlClient.request(getMessagesQuery, { chattingUserId: selectedConversation.id });
        return data?.getMessages || [];
      },
      enabled: !!selectedConversation, // Only run the query if a conversation is selected
    });
  
    useEffect(() => {
      if (query.data) {
        setMessages(query.data);
      }
    }, [query.data, setMessages]);
  
    return { ...query, messages };
  };

export const useSendMessage = ()=> {
    const { messages, setMessages, selectedConversation } = useConversation();
    const mutation= useMutation({
        mutationFn: async (payload: SendMessageInput)=> {
          graphqlClient.request(sendMessageMutation, {payload}).then((data)=> {
            if (data.sendMessage) {
              setMessages([...messages, data.sendMessage])
            }
          }).catch((error)=> console.error(error))        
        },

    })

    return mutation
}