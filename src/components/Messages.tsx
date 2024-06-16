
import { useGetMessages } from "../../hooks/chat";
// import useListenMessages from "../../hooks/useListenMessages";
// import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message"; 
import {useListenMessages} from '../../hooks/socket'

const Messages = () => {
	const { messages, isLoading } = useGetMessages();
	useListenMessages()
  
	if (isLoading) return <span className='loading loading-spinner mx-auto'>Loading...</span>;
  
	return (
		<div className='px-4 flex-1 overflow-auto'>
			{messages.map((message) => (
			<Message key={message?.createdAt} message={message} />
			))}
	
			{messages.length === 0 && (
			<p className='text-center text-white'>Send a message to start the conversation</p>
			)}
		</div>
	);
  };
export default Messages;