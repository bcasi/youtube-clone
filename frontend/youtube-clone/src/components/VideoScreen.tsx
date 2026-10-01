import React from "react";
import { Link } from "react-router-dom";

interface Video {
  createdAt: string;
  id: string;
  thumbnail: string;
  title: string;
  userId: string;
  videoUrl: string;
  user: User;
}

export interface User {
  id: string;
  channelName: string;
  profilePicture: string;
  username: string;
}

export default function VideoScreen({ video }: { video: Video }) {
  return (
    <Link to={`/watch/${video.id}`}>
      <div key={video.id} className="videos_parent">
        <img className="thumbnail" src={video.thumbnail} />
        <p>{video.title}</p>
      </div>
    </Link>
  );
}
