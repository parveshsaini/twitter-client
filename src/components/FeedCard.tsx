import { BiTrash } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { Tweet } from "../../gql/graphql";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteTweet, useLikeTweet, useUnlikeTweet } from "../../hooks/tweet";
import { useState } from "react";
import { useCurrentUser } from "../../hooks/user";
import toast from "react-hot-toast";


interface FeedCardProps {
  data: Tweet
  author?: boolean
}

const FeedCard = (props: FeedCardProps) => {
  const user= useCurrentUser()

  const {data}= props
  const { mutate: mutateDelete } = useDeleteTweet();
  const { mutate: mutateLike } = useLikeTweet()
  const { mutate: mutateUnlike } = useUnlikeTweet()

  const [likesCount, setLikesCount]= useState(data.likes?.length || 0)
  const [isLiked, setIsLiked]= useState(data.likes?.some(like=> like?.user?.id=== user.user?.id) || false)

  

  const navigate = useNavigate()

  const handleDelete = () => {
    mutateDelete(data.id);
    navigate(0)
  }

  const handleLike= ()=> {
    if(!user.user){
      toast('Login to get started!', {
        icon: '💡',
      });

      return
    }

    mutateLike(data.id)
    setLikesCount(likesCount+1)
    setIsLiked(true)
  }

  const handleUnlike= ()=> {
    if(!user.user){
      toast('Login to get started!', {
        icon: '💡',
      });

      return
    }

    mutateUnlike(data.id)
    setLikesCount(likesCount-1)
    setIsLiked(false)
  }

  // console.log('likes', data.likes)

  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all ">
      <div className="grid grid-cols-12 gap-3">
        {data.author?.profileImageUrl && (<div className="col-span-2 ">
        <Link to={`/${data.author.id}`}>
        
          <img
            src={data.author?.profileImageUrl}
            className="rounded-full cursor-pointer w-"
            alt="user-image"
            height={50}
            width={50}
          />
          </Link>
        </div>)}
        <div className="col-span-10">
        <Link to={`/${data.author!.id}`}>
          <h5 className="cursor-pointer">{data.author?.firstName} {data.author?.lastName}</h5>
        </Link>
          <p>
            {data.content}
          </p>
          
          {data.imageUrl && (
            <img
              src={data.imageUrl}
              alt="tweet-image"
              width={300}
              height={300}
              className="rounded-xl mt-2"
            />
          )}

          <div className="flex justify-between mt-5 text-xl items-center  w-[90%]">
            <div className="hover:cursor-pointer flex gap-x-2 items-center text-2xl">
            <span 
              onClick={isLiked? handleUnlike : handleLike}
              className={isLiked ? 'text-red-600':''}><AiOutlineHeart /></span> <span className="text-lg text-slate-400">{likesCount}</span> 
            </div>
           {props.author===true && <div className="hover:cursor-pointer" onClick={handleDelete}>
              <BiTrash />
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
  }


export default FeedCard;