
import { useChatScroll, useGetMessages } from "../../hooks/chat";
// import useListenMessages from "../../hooks/useListenMessages";
// import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message"; 
import {useListenMessages} from '../../hooks/socket'

const Messages = () => {
	const { messages, isLoading } = useGetMessages();
	useListenMessages()

	const ref = useChatScroll(messages) as React.MutableRefObject<HTMLDivElement>;
	
  
	if (isLoading) return <span className='loading loading-spinner mx-auto'>Loading...</span>;
  
	return (
		<div className='px-4 md:px-10 flex flex-col gap-y-2 overflow-auto mt-2' ref={ref}>
			{messages.map((message) => (
			<Message key={message?.createdAt} message={message} />
			))}
	
			{messages.length === 0 && (
			<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center mt-10 sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Send a message to start conversation</p>
			</div>
		</div>
			)}
		</div>
	);
  };
export default Messages;