import React from "react";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { Tweet } from "../../gql/graphql";
import { Link } from "react-router-dom";


interface FeedCardProps {
  data: Tweet
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
  const {data}= props
  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all ">
      <div className="grid grid-cols-12 gap-3">
        {data.author?.profileImageUrl && (<div className="col-span-1 ">
        <Link to={`/${data.author.id}`}>
        
          <img
            src={data.author?.profileImageUrl}
            className="rounded-full cursor-pointer"
            alt="user-image"
            height={50}
            width={50}
          />
          </Link>
        </div>)}
        <div className="col-span-11">
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

          <div className="flex justify-between mt-5 text-xl items-center p-2 w-[90%]">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;