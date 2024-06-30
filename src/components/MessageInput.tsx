import { useState } from "react";
import { useSendMessage } from "../../hooks/chat"; 

const MessageInput = ({recieverId}: {recieverId: string}) => {
	const [message, setMessage] = useState("");

	const { mutate } = useSendMessage();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!message.trim()) return;
		mutate({ body: message, recieverId});
		setMessage("");
	};
	return (
		<form className='px-4 py-2' onSubmit={handleSubmit}>
      <div className='w-full relative'>
        <input
          type='text'
          className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
          placeholder='Send a message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit' className='absolute inset-y-0 right-0 flex items-center pr-3'>
          Send
        </button>
      </div>
    </form>
  );
};
export default MessageInput;