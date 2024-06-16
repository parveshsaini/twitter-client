// import { useSocketContext } from "../../context/SocketContext";
import  { ConversationType, useConversation } from "../../zustand/useConversation";
import { useSocketContext } from "../context/socket";

const Conversation = ({ conversation }: { conversation?: ConversationType }) => {
	const { setSelectedConversation, selectedConversation } = useConversation();
	const isSelected = selectedConversation?.id === conversation?.id;

	const { onlineUsers } = useSocketContext();

	const isOnline = onlineUsers.includes(conversation? conversation.id : "");

	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2
				 py-1 cursor-pointer ${isSelected ? "bg-sky-500" : ""}`}
				onClick={() => setSelectedConversation(conversation ? conversation : null)}
			>
				<div className={``}>
					<div className='w-8 md:w-12 rounded-full'>
						{conversation?.profileImageUrl && <img src={conversation?.profileImageUrl} alt='user avatar' />}
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between flex-col'>
						<p className='font-bold text-gray-200 text-sm md:text-md'>{conversation?.firstName} {conversation?.lastName}</p>
						{isOnline? <p className="text-green-500 gap-1">Online</p>: <p>Offline</p>}
					</div>
				</div>
			</div>

			<div className='divider my-0 py-0 h-1' />
		</>
	);
};
export default Conversation;