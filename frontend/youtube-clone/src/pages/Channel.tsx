import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChannel, subscribe, unSubscribe } from "../api/api";
import type { User } from "../components/VideoScreen";
import useChannel from "../lib/hooks/useChannel";

export interface Uploads {
  createdAt: string;
  id: string;
  thumbnail: string;
  title: string;
  userId: string;
  videoUrl: string;
}

export interface Channel {
  uploads: Uploads[];
  user: User;
}

export default function Channel() {
  const { channelname } = useParams<{ channelname: string }>();

  const {
    channel,

    isSubscribe,

    handleUnSubscribe,
    handleSubscribe,
  } = useChannel({ channelname: channelname ?? "" });
  console.log(channelname);

  return (
    <div className=" flex flex-col">
      <div className="flex justify-center max-h-43 w-267.5">
        <img
          className="object-cover w-full rounded-2xl"
          src={channel?.user?.banner}
        />
      </div>
      <div className="flex gap-3">
        <div className="max-w-48 mt-3 rounded-full">
          <img
            src={channel?.user.profilePicture}
            className="rounded-full w-full"
          />
        </div>
        <div className="flex flex-col">
          <h1>{channel?.user?.channelName}</h1>
          <div className="flex gap-4">
            <p>{channel?.user?.subscriberCount} subscribers</p>
            <p>{channel?.uploads.length} Videos</p>
          </div>
          <div className="">
            {isSubscribe ? (
              <button
                onClick={handleUnSubscribe}
                className="px-2 py-2 border-2 rounded-2xl border-white mr-32 mt-5 cursor-pointer"
              >
                Subscribed
              </button>
            ) : (
              <button
                onClick={handleSubscribe}
                className="px-2 py-2 border-2 rounded-2xl border-white mr-32 mt-5 cursor-pointer"
              >
                Subscribe
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
