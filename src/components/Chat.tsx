import { Link } from "react-router-dom";
import { useCurrentUser } from "../../hooks/user";
import ChatSidebar from "./ChatSidebar";
import MessageContainer from "./MessageContainer";

const Chat = () => {
  const user = useCurrentUser();
  return (
    <div className="m-3 px-3 lg:mx-28 pt-6 max-h-screen overflow-hidden">
      <div className="flex gap-x-4 items-center">
        <Link to={"/"}>
          <button className="p-3 border rounded-xl">Back</button>
        </Link>
        <h1 className="text-3xl font-bold">Messages</h1>
      </div>

      <div className="mt-7 flex gap-5 h-[700px] lg:h-[420px]">
        {" "}
        {/* Adjust height based on header size */}
        <ChatSidebar />
        {user ? <MessageContainer /> : <h1>Please login to view messages</h1>}
      </div>
    </div>
  );
};
export default Chat;
