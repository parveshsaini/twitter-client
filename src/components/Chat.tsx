
import ChatSidebar from "./ChatSidebar";
import MessageContainer from "./MessageContainer";
// import MessageContainer from "./MessageContainer";

const Chat = () => {
	return (
		<div className='flex h-[80vh] w-full md:max-w-screen-md md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<ChatSidebar />
			<MessageContainer />
		</div>
	);
};
export default Chat;