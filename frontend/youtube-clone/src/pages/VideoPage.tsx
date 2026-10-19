import ReactPlayer from "react-player";
import { useParams, useSearchParams } from "react-router-dom";
import "./VideoPage.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  getComments,
  getReply,
  postComment,
  postReply,
  watchVideo,
} from "../api/api";
import useChannel from "../lib/hooks/useChannel";
import type { User, Video } from "../components/VideoScreen";

export interface Comment {
  id: string;
  createdAt: Date;
  content: string;
  uploadedId: string;
  userId: string;
  replies: Reply;
}

export interface Reply {
  id: string;
  content: string;
  userId: string;
  commentId: string;
  createdAt: Date;
  user: User;
  comments: Comment;
}

export default function VideoPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const channelname = searchParams.get("channelname");
  console.log(channelname);
  const [video, setVideo] = useState<Video | undefined>();
  const [allVideos, setAllVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<Comment | []>([]);
  const [typeComment, setTypeComment] = useState("");
  const [isReply, setIsReply] = useState("");
  const [typeReply, setTypeReply] = useState("");
  const [showReplies, setShowReplies] = useState<Reply | []>([]);

  const { isSubscribe, handleUnSubscribe, handleSubscribe, token } = useChannel(
    { channelname: channelname ?? "" },
  );
  console.log(channelname);

  console.log(id);
  useEffect(() => {
    if (!id) return;
    const fetchVideo = async () => {
      const res = await watchVideo(id, token);
      setVideo(res);
      setIsLoading(false);
    };

    fetchVideo();
  }, [id]);

  useEffect(() => {
    const getAllVideos = async () => {
      const getVideos = await axios.get("http://localhost:3000/api/videos");
      const respone = await getVideos.data;
      console.log("allvideos", respone);
      setAllVideos(respone);
    };
    getAllVideos();
  }, []);

  useEffect(() => {
    const comments = async () => {
      if (!id) {
        return;
      }
      const getAllComments = await getComments(id);
      setComments(getAllComments);
    };
    comments();
  }, [id]);

  const handleTypeComment = (e) => {
    const value = e.target.value;
    setTypeComment(value);
  };

  const handlePostComment = async () => {
    if (!token) return;
    if (!id) return;
    if (!typeComment) return;
    const allComments = await postComment(token, id, typeComment);
    setComments(allComments);
  };

  const handlePostReply = async (commentId: string) => {
    if (!token) return;
    if (!commentId) return;
    if (!typeReply) return;
    const allReplies = await postReply(token, commentId, typeReply);
    setShowReplies(allReplies);
  };

  const showReply = async (commentId: string) => {
    if (commentId !== "") {
      const getReplies = await getReply(commentId);
      setShowReplies(getReplies);
    }
  };

  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <div className="videos_container">
      {/* <iframe
        width="560"
        height="315"
        src={video.videoUrl}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe> */}
      <div className="video_container">
        <video width="600" controls>
          <source src={video?.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="flex">
          <h1>{video.title}</h1>
        </div>
        <div className="flex gap-5 items-center">
          <div className="flex gap-2 items-center">
            <img
              className="block max-w-17 max-h-13.5 rounded-full"
              src={video.user.profilePicture}
            />
            <p>{video.user.channelName}</p>
          </div>
          <div className="flex items-center mb-6">
            {isSubscribe ? (
              <button
                onClick={handleUnSubscribe}
                className="px-2 py-2 border-2 rounded-2xl border-white mr-32 mt-5 cursor-pointer"
              >
                Subscribed
              </button>
            ) : (
              <button
                onClick={handleSubscribe}
                className="px-2 py-2 border-2 rounded-2xl text-black bg-white border-white mr-32 mt-5 cursor-pointer"
              >
                Subscribe
              </button>
            )}
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <p className="text-white">{comments?.length} Comments</p>
        </div>

        <div className="flex gap-5 items-center">
          <div className="flex gap-2 items-center">
            <img
              className="block mt-3 max-w-6 max-h-13.5 rounded-full"
              src={video?.user.profilePicture}
            />
            <textarea
              value={typeReply}
              onChange={(e) => setTypeReply(e.target.value)}
              className="border-b-2 w-full min-w-2xl focus:outline-none focus:border-b-2 pt-3"
            ></textarea>
          </div>
        </div>
        <div className="flex gap-5 items-end justify-end">
          <button
            onClick={handlePostComment}
            className="rounded-2xl border-2 px-2 cursor-pointer"
          >
            Comment
          </button>
        </div>
        <div className="flex flex-col gap-5 items-start  justify-start">
          {comments?.map((item) => (
            <div className="flex flex-col w-full items-start">
              <p className="text-white">{item?.content}</p>
              <button
                onClick={() =>
                  setIsReply((isId) => (isId == "" ? item.id : ""))
                }
                className="cursor-pointer"
              >
                Reply
              </button>
              {isReply == item.id && (
                <div className="flex">
                  <textarea
                    value={typeReply}
                    onChange={(e) => setTypeReply(e.target.value)}
                    className="border-b-2 w-full min-w-2xl focus:outline-none focus:border-b-2 pt-3"
                  ></textarea>
                  <button
                    onClick={() => handlePostReply(item.id)}
                    className="rounded-2xl border-2 px-2 cursor-pointer"
                  >
                    Reply
                  </button>
                </div>
              )}
              <div
                onClick={() => showReply(item.id)}
                className="cursor-pointer text-white"
              >
                {item.replies.length} Replies &#8595;
              </div>
              {showReplies?.length >= 1 && (
                <div className="flex flex-col items-start">
                  {showReplies?.map((replies) => (
                    <p className="text-white">
                      {replies.commentId == item.id && replies.content}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="all_videos_container">
        {allVideos.map((video) => (
          <div className="all_videos">
            <img className="thumbnail" src={video.thumbnail} />
          </div>
        ))}
      </div>
    </div>
  );
}
