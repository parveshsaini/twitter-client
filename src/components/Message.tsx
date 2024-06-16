import { useCurrentUser } from '../../hooks/user';
import { extractTime } from '../../services/time'
import  { MessageType, useConversation} from "../../zustand/useConversation";

const Message = ({ message }: { message: MessageType }) => {
	const { user } = useCurrentUser();
	const { selectedConversation } = useConversation();

	const fromMe = message?.sender?.id === user?.id;
	const img = fromMe ? user?.profileImageUrl : selectedConversation?.profileImageUrl;
	const chatClass = fromMe ? "chat-end" : "chat-start";

	const bubbleBg = fromMe ? "bg-blue-500" : "";
	// const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClass}`}>
			<div className='hidden md:block chat-image avatar'>
				<div className='w-6 md:w-10 rounded-full'>
					{img && <img alt='Tailwind CSS chat bubble component' src={img} />}
				</div>
			</div>
			<p className={`chat-bubble text-white ${bubbleBg}  text-sm md:text-md`}>{message?.body}</p>
			<span className='chat-footer opacity-50 text-xs flex gap-1 items-center text-white'>
				{ message?.createdAt && extractTime(message.createdAt)}
			</span>
		</div>
	);
};
export default Message;