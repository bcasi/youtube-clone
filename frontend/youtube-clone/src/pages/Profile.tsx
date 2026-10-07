import React, { useEffect, useState } from "react";
import { getUser } from "../api/api";
import type { User } from "../components/VideoScreen";
import VideoScreen from "../components/VideoScreen";

export default function Profile() {
  const [profile, setProfile] = useState<User | null>(null);
  const [videos, setVideos] = useState([]);
  const token = localStorage.getItem("token");
  console.log(token);

  useEffect(() => {
    if (!token) return;
    const fetchUser = async () => {
      try {
        const user = await getUser(token);
        setProfile(user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [token]);
  console.log(profile);
  return (
    <div className="flex flex-col">
      <div className="flex gap-5">
        <img className="rounded-full w-24 h-24" src={profile?.profilePicture} />
        <p className="text-white text-5xl">{profile?.username}</p>
      </div>
      <div className="flex flex-col justify-start items-start">
        <h3 className="text-2xl text-white">History</h3>
        <div className="flex max-h-40 gap-3.5 flex-wrap py-2">
          {profile?.history?.map((item) => (
            <VideoScreen key={item.id} video={item.uploads} />
          ))}
        </div>
      </div>
    </div>
  );
}
