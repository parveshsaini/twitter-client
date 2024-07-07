import { useCallback, useEffect, useMemo, useState } from 'react'
import TwitterLayout from './TwitterLayout'
import { BsArrowLeftShort } from 'react-icons/bs';
import { useCurrentUser, useGetUserById } from '../../hooks/user';
import { useParams } from 'react-router-dom';
import graphqlClient from '../../services/api';
import {FollowUserMutations, UnfollowUserMutations} from '../../graphql/mutation/user'
import { useQueryClient } from '@tanstack/react-query';
import FeedCard from './FeedCard';
import { Tweet } from '../../gql/graphql';


const Profile = () => {
  const queryClient= useQueryClient()

    const {id} = useParams() 

    const { user } =useCurrentUser()

    const {userInfo}= useGetUserById(id as string)

    const [loading, setLoading] = useState(true);

    const [author, setAuthor]= useState<boolean>(false)

    const iAmFollowing= useMemo(()=> {
      if(!userInfo || !user){
        return false
      }

      return userInfo?.followers?.find((follower)=> follower?.id=== user?.id)
    }, [userInfo, user])

    const handleFollowUser= useCallback(async ()=> {
      if(!userInfo || !userInfo.id) return

      await graphqlClient.request(FollowUserMutations, {to: userInfo!.id})

      queryClient.invalidateQueries({ queryKey: ['user', userInfo.id]})
    }, [userInfo, queryClient])

    const handleUnfollowUser= useCallback(async ()=> {
      if(!userInfo || !userInfo.id) return

      await graphqlClient.request(UnfollowUserMutations, {to: userInfo!.id})

      queryClient.invalidateQueries({ queryKey: ['user', userInfo.id] })
    }, [userInfo, queryClient])

    const isAdmin= id=== "19dd8498-33e6-44e5-98e9-7b68db817057"


    useEffect(() => {
        if (userInfo) {
            setLoading(false);
            if(userInfo.id===user?.id){
              setAuthor(true)
            }
        } else {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [user?.id, userInfo]);

    // console.log(userInfo)

    return (
        <div>
          <TwitterLayout>

            {loading? <h1>Loading...</h1>
            
            
            : userInfo? (<div>
              <nav className="flex items-center gap-3 py-3 px-3">
                <BsArrowLeftShort className="text-4xl" />
                <div>
                  <h1 className="text-2xl font-bold">{userInfo.firstName} {userInfo.lastName}</h1>
                  <h1 className="text-md font-bold text-slate-500">
                    {userInfo?.tweets?.length} Tweets
                  </h1>
                </div>
              </nav>
              <div className="p-4 border-b border-slate-800">
                {userInfo?.profileImageUrl && (
                  <img
                    src={userInfo?.profileImageUrl}
                    alt="user-image"
                    className="rounded-full"
                    width={100}
                    height={100}
                  />
                )}
                <div className='flex justify-between'>
                  <div className='flex items-center gap-x-2'>
                <h1 className="text-2xl font-bold mt-5">{userInfo.firstName} {userInfo.lastName}  </h1>
                {isAdmin && <img src="/tick.png" alt="verified"  className='h-7 w-7 mt-5'/> }
                </div>
                {
                user?.id !== userInfo.id && 
                (!iAmFollowing? (<button 
                  className=" bg-white text-black px-3 py-1 rounded-full text-sm mt-5 font-semibold"
                  onClick={handleFollowUser}
                  >
                  Follow
                </button>) :
                (<button 
                  className=" bg-transparent text-white border border-white px-3 py-1 rounded-full text-sm mt-5 font-semibold"
                  onClick={handleUnfollowUser}
                  >
                  Unfollow
                </button>))
                }
                </div>
                <div className='flex gap-4 mt-2 text-sm text-gray-400'>
                  <button className='cursor-pointer' ><span>{userInfo.followers?.length} Followers</span></button>
                  <h1> | </h1>
                  <button className='cursor-pointer' ><span>{userInfo.following?.length} Following</span></button>
                </div>
              </div>
              <div>
                {userInfo?.tweets?.map((tweet) => (
                  <FeedCard data={tweet as Tweet} author={author} key={tweet?.id} />
                ))}
              </div>
              
            </div>)
            
            : <h1>User not found</h1>
            }

          </TwitterLayout>
        </div>
      );
}

export default Profile
