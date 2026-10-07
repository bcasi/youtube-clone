import React, { useEffect, useState } from "react";
import { subscriptions } from "../api/api";
import VideoScreen from "../components/VideoScreen";

export default function Subscriptions() {
  const [subs, setSubs] = useState([]);
  useEffect(() => {
    const getAllSub = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const getSubs = await subscriptions(token);
      setSubs(getSubs);
      console.log(getSubs);
    };
    getAllSub();
  }, []);

  return (
    <div className="flex flex-wrap gap-6">
      {subs.map((item) => (
        <VideoScreen key={item?.id} video={item} />
      ))}
    </div>
  );
}
