
import { useCurrentUser } from "../../hooks/user";
import { useConversation } from "../../zustand/useConversation"; 
import MessageInput from "./MessageInput";
import Messages from "./Messages";
// import Messages from "./Messages";


const MessageContainer = () => {
	const { selectedConversation } = useConversation();

	return (
		<div className='w-full flex flex-col h-full bg-slate-900'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <div className="relative flex flex-col h-full">
          {/* Header */}
          <div className='bg-slate-700 px-4 py-2'>
            <span className='label-text'>To:</span>{" "}
            <span className='text-white font-bold'>{selectedConversation.firstName}</span>
          </div>

          {/* Messages container */}
          <div className="flex-grow overflow-y-auto">
            <Messages />
          </div>

          {/* Input */}
          <div className="bg-slate-900">
            <MessageInput recieverId={selectedConversation.id} />
          </div>
        </div>
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
				<p>Welcome 👋 {user?.firstName} {user?.lastName}</p>
				<p>Select a chat to start messaging</p>
				{/* <MessageCircle className='text-3xl md:text-6xl text-center' /> */}
			</div>
		</div>
	);
};