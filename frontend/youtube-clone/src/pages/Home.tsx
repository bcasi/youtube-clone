import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import VideoScreen from "../components/VideoScreen";
import LoaderSpinner from "../components/LoaderSpinner";

export default function Home({ search }: { search: string }) {
  const [videos, setVideos] = useState([]);
  const [debounceSearch, setDebounceSearch] = useState(search);
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        const getVideos = await axios.get("http://localhost:3000/api/videos", {
          params: { title: debounceSearch },
        });
        const data = await getVideos.data;
        console.log(data);
        setVideos(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchVideos();
  }, [debounceSearch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <div className="videos_container">
      {videos.map((item) => (
        <VideoScreen video={item} />
      ))}
    </div>
  );
}
