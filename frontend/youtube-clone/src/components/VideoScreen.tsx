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

export interface Subscription {
  id: string;
  subscriberId: string;
  channelId: string;
  subscriber: User; // the user who subscribed
  channel: User;
}

export interface User {
  id: string;
  channelName: string;
  profilePicture: string;
  username: string;
  banner: string;
  history: History;
  subscriberCount: number;
  subscriptions: Subscription[]; // channels this user follows
  subscribers: Subscription[];
}

export interface History {
  id: string;
  uploadedId: string;
  userId: string;
  watchedAt: string;
}

export default function VideoScreen({ video }: { video: Video }) {
  return (
    <div key={video.id} className="videos_parent min-h-64 min-w-64 ">
      <Link to={`/watch/${video.id}`}>
        <img className="thumbnail" src={video.thumbnail} />
        <p>{video.title}</p>
      </Link>
      <Link to={`/channel/${video.user?.channelName}`} className="flex  gap-5">
        <img className="w-9 rounded-full" src={video.user?.profilePicture} />
        <p>{video.user?.channelName}</p>
      </Link>
    </div>
  );
}
