import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import VideoScreen from "../components/VideoScreen";

export default function Home({ search }: { search: string }) {
  const [videos, setVideos] = useState([]);
  const [debounceSearch, setDebounceSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceSearch(search);
    });

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const getVideos = await axios.get("http://localhost:3000/api/videos", {
          params: { title: debounceSearch },
        });
        const data = await getVideos.data;
        console.log(data);
        setVideos(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideos();
  }, [debounceSearch]);

  return (
    <div className="videos_container">
      {videos.map((item) => (
        <VideoScreen video={item} />
      ))}
    </div>
  );
}
