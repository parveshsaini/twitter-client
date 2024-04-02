import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import React, { useCallback } from 'react'
import { BiHomeCircle, BiUser } from 'react-icons/bi';
import { BsEnvelope, BsTwitter } from 'react-icons/bs';
import graphqlClient from '../../services/api';
import { verifyGoogleTokenQuery } from '../../graphql/query/user';
import toast from 'react-hot-toast';
import { useCurrentUser } from '../../hooks/user';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';


interface TwitterLayoutProps {
    children : React.ReactNode
}

interface TwitterSidebarButton {
    title: string;
    icon: React.ReactNode;
    link: string;
  }


const TwitterLayout: React.FC<TwitterLayoutProps> = (props: TwitterLayoutProps) => {
    const { user= undefined } = useCurrentUser()

    const [userLoaded, setUserLoaded]= React.useState(false)

    React.useEffect(()=> {
      if(user){
        setUserLoaded(true)
      }
    }, [user])

    const sidebarMenuItems: TwitterSidebarButton[] = [
      {
        title: "Home",
        icon: <BiHomeCircle />,
        link: "/",
      },
      {
        title: "Messages",
        icon: <BsEnvelope />,
        link: "/",
      },
      {
        title: "Profile",
        icon: <BiUser />,
        link: `/${user?.id}`,
      },
    ];
  
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
      setUserLoaded(true)
    }, [queryClient]) 

  return (
    <div className="grid grid-cols-12 h-screen w-screen sm:px-56">
        <div className="col-span-2 sm:col-span-3 pt-1 flex sm:justify-end pr-4 relative">
          <div>
          <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
            <BsTwitter />
          </div>
          <div className="mt-1 text-xl pr-4">
            <ul>
              {sidebarMenuItems.map((item) => (
                <li
                  className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
                  key={item.title}
                >
                  <Link to={item.link}>
                  <span className=" text-3xl">{item.icon}</span>
                  </Link>

                  <Link to={item.link}>
                  <span className='hidden sm:inline'>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 px-3">
              <button className="hidden sm:block bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                Tweet
              </button>
              <button className="block sm:hidden bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                <BsTwitter />

              </button>
            </div>
          </div>
          </div>
          {user && (
            <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
              {user && user.profileImageUrl && (
                <img
                  className="rounded-full"
                  src={user?.profileImageUrl}
                  alt="user-image"
                  height={50}
                  width={50}
                />
              )}
              <div className='hidden sm:block'>
                <h3 className="text-xl">
                  {user.firstName} {user.lastName}
                </h3>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-10  sm:col-span-5 scrollbar-hide border-r-[1px] border-l-[1px] h-screen overflow-scroll border-gray-600">
          
          {props.children}
     
        </div>
        {!userLoaded && <div className=" p-5 sm:col-span-3">
          <div className="p-5 bg-slate-500 rounded-lg ">
            <h1 className="my-2 text-2xl">New Here?</h1>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
        </div>}
      </div>
  )
}

export default TwitterLayout
