
import { useCurrentUser } from "../../hooks/user";
import { useConversation } from "../../zustand/useConversation"; 
import MessageInput from "./MessageInput";
import Messages from "./Messages";
// import Messages from "./Messages";


const MessageContainer = () => {
	const { selectedConversation } = useConversation();

	return (
		<div className='w-full flex flex-col'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation.firstName}</span>
					</div>

					<Messages />
					<MessageInput recieverId= {selectedConversation.id}/>
				</>
			)}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { user } = useCurrentUser();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {user?.firstName} ❄</p>
				<p>Select a chat to start messaging</p>
				{/* <MessageCircle className='text-3xl md:text-6xl text-center' /> */}
			</div>
		</div>
	);
};