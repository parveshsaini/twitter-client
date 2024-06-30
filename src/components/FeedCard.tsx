import { BiTrash } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { Tweet } from "../../gql/graphql";
import { Link } from "react-router-dom";
import { useDeleteTweet } from "../../hooks/tweet";


interface FeedCardProps {
  data: Tweet
  author?: boolean
}

const FeedCard = (props: FeedCardProps) => {
  const {data}= props
  const { mutate } = useDeleteTweet();

  const handleDelete = () => {
    mutate(data.id);
  }

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

          <div className="flex justify-between mt-5 text-xl items-center  w-[90%]">
            <div className="hover:cursor-pointer">
            <AiOutlineHeart />
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