import ReactPlayer from "react-player";
import { useParams, useSearchParams } from "react-router-dom";
import "./VideoPage.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { watchVideo } from "../api/api";
import useChannel from "../lib/hooks/useChannel";

export default function VideoPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const channelname = searchParams.get("channelname");
  console.log(channelname);
  const [video, setVideo] = useState();
  const [allVideos, setAllVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { channel, isSubscribe, handleUnSubscribe, handleSubscribe, token } =
    useChannel({ channelname: channelname ?? "" });
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
          <source src={video.videoUrl} type="video/mp4" />
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
