import { useEffect, useState } from 'react'
import TwitterLayout from './TwitterLayout'
import { BsArrowLeftShort } from 'react-icons/bs';
import { useGetUserById } from '../../hooks/user';
import { useParams } from 'react-router-dom';
import FeedCard from './FeedCard';
import { Tweet } from '../../gql/graphql';

const Profile = () => {
    const {id} = useParams() 

    const {userInfo}= useGetUserById(id as string)

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userInfo) {
            setLoading(false);
        } else {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [userInfo]);

    console.log(userInfo)

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
                <h1 className="text-2xl font-bold mt-5">{userInfo.firstName} {userInfo.lastName}</h1>
              </div>
              <div>
                {userInfo?.tweets?.map((tweet) => (
                  <FeedCard data={tweet as Tweet} key={tweet?.id} />
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
