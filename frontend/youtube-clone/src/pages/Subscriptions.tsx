import React, { useEffect, useState } from "react";
import { subscriptions } from "../api/api";
import VideoScreen from "../components/VideoScreen";
import LoaderSpinner from "../components/LoaderSpinner";

export default function Subscriptions() {
  const [subs, setSubs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getAllSub = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      setIsLoading(true);
      const getSubs = await subscriptions(token);
      setSubs(getSubs);
      console.log(getSubs);
      setIsLoading(false);
    };
    getAllSub();
  }, []);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LoaderSpinner />
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-6">
      {subs.map((item) => (
        <VideoScreen key={item?.id} video={item} />
      ))}
    </div>
  );
}
