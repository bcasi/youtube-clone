import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const getVideos = await axios.get("http://localhost:3000/api/videos");
        const data = await getVideos.data;
        console.log(data);
        setVideos(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="videos_container">
      {videos.map((item) => (
        <Link to={`/watch/${item.id}`}>
          <div key={item.id} className="videos_parent">
            <img className="thumbnail" src={item.thumbnail} />
            <p>{item.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
