import { useCurrentUser } from "../../hooks/user";
import { MessageType, useConversation } from "../../zustand/useConversation";

const Message = ({ message }: { message: MessageType }) => {
  const { user } = useCurrentUser();
  const { selectedConversation } = useConversation();

  const fromMe = message?.sender?.id === user?.id;
  const img = fromMe
    ? user?.profileImageUrl
    : selectedConversation?.profileImageUrl;
  const chatClass = fromMe ? "justify-end" : "justify-start";

  const bubbleBg = fromMe ? "bg-blue-500 " : "bg-slate-500";
  const shakeClass = message?.shouldShake ? "shake" : "";

  return (
    <div className={`${chatClass} flex gap-2  items-center`}>
      {!fromMe && (
        <div className="">
          {img && (
            <img
              alt={message?.sender?.firstName}
              src={img}
              className="w-5 md:w-7 rounded-full"
            />
          )}
        </div>
      )}

      <div className="flex flex-col ">
        <p
          className={` text-white ${shakeClass} ${bubbleBg} w-fit px-2 rounded-lg text-sm md:text-lg`}
        >
          {message?.body}
        </p>
      </div>

      {fromMe && (
        <div className="">
          {img && (
            <img
              alt={message?.sender?.firstName}
              src={img}
              className="w-5 md:w-7 rounded-full"
            />
          )}
        </div>
      )}
    </div>
  );
};
export default Message;
