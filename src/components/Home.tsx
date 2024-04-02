import { useCallback, useState } from "react";
import { BiImageAlt} from "react-icons/bi";
import FeedCard from "./FeedCard";

import { useCurrentUser } from "../../hooks/user";
import { useCreateTweet, useGetAllTweets } from "../../hooks/tweet";
import { Tweet } from "../../gql/graphql";
import  "../App.css"
import TwitterLayout from "./TwitterLayout";
import graphqlClient from "../../services/api";
import { getSignedUrlQuery } from "../../graphql/query/tweet";
import axios from "axios";
import toast from "react-hot-toast";

export default function Home() {
  const { user }= useCurrentUser()
  const { tweets = [] } = useGetAllTweets();
  const { mutate } = useCreateTweet();

  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("")

  const handleImageUpload= useCallback((input: HTMLInputElement)=> {
    return async (event: Event)=> {
      event.preventDefault()

      const file: File | null | undefined= input.files?.item(0)

      if(!file){
        return
      }

      const { getSignedUrl }= await graphqlClient.request(getSignedUrlQuery, {
        imageName: file.name,
        imageType: file.type
      })

      if(getSignedUrl){
        toast.loading("Uploading...", {id: "2"})
        axios.put(getSignedUrl, file, {
          headers: {
            "Content-Type": file.type
          }
        })
        toast.success("Uploaded Succesfully", {id: "2"})

        const url= new URL(getSignedUrl)
        const filePath= `${url.origin}/${url.pathname}`
        setImageUrl(filePath)
      }
    }
  }, [])

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.addEventListener("change", handleImageUpload(input))

    input.click();
  }, [handleImageUpload]);

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
      imageUrl
    });

    setContent("")
    setImageUrl("")
  }, [content, mutate, imageUrl]);

  console.log(user)



  return (
 
  
        <TwitterLayout>
        {user && (<div>
            <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-1">
                  {user?.profileImageUrl && (
                    <img
                      className="rounded-full"
                      src={user?.profileImageUrl}
                      alt="user-image"
                      height={50}
                      width={50}
                    />
                  )}
                </div>
                <div className="col-span-11">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-transparent text-xl px-3 border-b border-slate-700"
                    placeholder="What's happening?"
                    rows={3}
                  ></textarea>

                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="tweet-image"
                      width={300}
                      height={300}
                      className="rounded-xl mt-2"
                    />
                  )}

                  <div className="mt-2 flex justify-between items-center">
                    <BiImageAlt
                      onClick={handleSelectImage}
                      className="text-xl"
                    />
                    <button
                      onClick={handleCreateTweet}
                      className="bg-[#1d9bf0] font-semibold text-sm py-2 px-4 rounded-full"
                    >
                      Tweet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>)}
          
          {
            tweets?.map((tweet)=> tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} />: null)
          }
     
        </TwitterLayout>
     
        
  );
}