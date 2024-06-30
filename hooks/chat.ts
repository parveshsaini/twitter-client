/* eslint-disable @typescript-eslint/no-unused-vars */

import { useMutation, useQuery } from "@tanstack/react-query";
import { getMessagesQuery, getUsersForSidebarQuery } from "../graphql/query/chat";
import graphqlClient from "../services/api";
import { ConversationType, useConversation } from "../zustand/useConversation";

import { useEffect, useRef, useState } from "react";
import { SendMessageInput } from "../gql/graphql";
import { sendMessageMutation } from "../graphql/mutation/chat";


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
    const { messages, setMessages } = useConversation();
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


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useChatScroll(dep: any) {
	const ref = useRef<HTMLElement>();

	useEffect(() => {
		setTimeout(() => {
			if (ref.current) {
				ref.current.scrollTop = ref.current.scrollHeight;
			}
		}, 100);
	}, [dep]);

	return ref;
}
