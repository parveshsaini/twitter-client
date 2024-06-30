import { useEffect } from "react";
import {useSocketContext} from "../src/context/socket"
import { useConversation } from "../zustand/useConversation";

// import useConversation from "../zustand/useConversation";

// import notificationSound from "../assets/sounds/notification.mp3";



export const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.createdAt = new Date().toISOString;
			setMessages([...messages, newMessage]);
		});

		return () => {
			socket?.off("newMessage");
		};
	}, [socket, messages, setMessages]);
};