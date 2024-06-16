import { create } from "zustand";

export type ConversationType = { __typename?: 'User', id: string, firstName: string, lastName?: string | null, profileImageUrl?: string | null } | null

export type MessageType = { __typename?: 'Message',id: string, body: string, createdAt?: string | null, sender?: { __typename?: 'User', id: string, firstName: string, lastName?: string | null } | null } | null

interface ConversationState {
	selectedConversation: ConversationType | null;
	messages: MessageType[];
	setSelectedConversation: (conversation: ConversationType | null) => void;
	setMessages: (messages: MessageType[]) => void;
}

export const useConversation = create<ConversationState>((set) => ({
	selectedConversation: null,
	setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
	messages: [],
	setMessages: (messages) => set({ messages: messages }),
}));

