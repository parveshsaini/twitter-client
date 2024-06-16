import {useGetConversations}  from '../../hooks/chat'
import { useCurrentUser } from '../../hooks/user';
import Conversation from "./Conversation";

const ChatSidebar = () => {
	const { conversations, isLoading } = useGetConversations();
	const {user}= useCurrentUser()

	if(isLoading) return <span className='loading loading-spinner mx-auto' >Loading...</span>

	return (
        <div className='py-2 flex flex-col overflow-auto'>
            {conversations && conversations.map((conversation) => {
                return (user && user?.id!=conversation?.id) ? <Conversation key={conversation?.id} conversation={conversation} /> : null;
            })}
        </div>
    );
};
export default ChatSidebar;