import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import "./VideoPage.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState();
  const [allVideos, setAllVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(id);
  useEffect(() => {
    const fetchVideo = async () => {
      const video = await axios.get("http://localhost:3000/api/videos/" + id);
      const res = await video.data;
      console.log(res);
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
