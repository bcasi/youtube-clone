import React, { useEffect, useState } from "react";
import { getUser } from "../api/api";
import type { User } from "../components/VideoScreen";

export default function Profile() {
  const [profile, setProfile] = useState<User | null>(null);
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
        <h3>History</h3>
        <div></div>
      </div>
    </div>
  );
}
