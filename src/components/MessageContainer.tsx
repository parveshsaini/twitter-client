
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useCurrentUser } from "../../hooks/user";
import { useConversation } from "../../zustand/useConversation"; 
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import graphqlClient from "../../services/api";
import { verifyGoogleTokenQuery } from "../../graphql/query/user";
import toast from "react-hot-toast";
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
  const queryClient = useQueryClient();


  const handleGoogleLogin = useCallback( async (cred: CredentialResponse) =>{
    const googleToken= cred.credential
    console.log("google token", googleToken)
    if(!googleToken){
      return toast.error('Failed Google login :/')
    }

    const {verifyGoogleToken}= await graphqlClient.request(verifyGoogleTokenQuery, {token: googleToken})

    toast.success('Success signin')
    console.log(verifyGoogleToken)

    if(verifyGoogleToken){
      window.localStorage.setItem('token', verifyGoogleToken)
    }

    await queryClient.invalidateQueries({ queryKey: ['current-user'] })
    // setUserLoaded(true)
  }, [queryClient]) 

  
	return (
    <div className='flex items-center justify-center w-full h-full'>
    {!user ? <div className=" p-15 md:col-span-3  md:flex flex-col items-center justify-center">
      <div className="p-5 bg-slate-500 rounded-lg ">
        <h1 className="my-2 text-2xl">New Here?</h1>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </div>:

    
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {user?.firstName} {user?.lastName}</p>
				<p>Select a chat to start messaging</p>
				{/* <MessageCircle className='text-3xl md:text-6xl text-center' /> */}
			</div>
        }
        </div>
		
	);
};