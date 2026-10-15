import { useEffect, useState } from "react";
import { getChannel, subscribe, unSubscribe } from "../../api/api";
import type { Channel } from "../../pages/Channel";

export default function useChannel({ channelname }: { channelname: string }) {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!channelname) return;
    const getChannelData = async () => {
      const fetch = await getChannel(channelname);
      console.log(fetch);
      setChannel(fetch);
      let isSubscribed = fetch?.user.subscribers.some(
        (item) => item.subscriberId === userId,
      );
      setIsSubscribe(isSubscribed);
    };
    getChannelData();
  }, [channelname, userId]);

  const handleUnSubscribe = async () => {
    if (!token) return;
    if (!channel?.user?.id) return;
    if (!channelname) return;
    const sub = await unSubscribe(token, channel?.user?.id);

    const channelSubId = await sub.channelId;

    const fetch = await getChannel(channelname);
    console.log(fetch);
    setChannel(fetch);
    let isSubscribed = fetch?.user.subscribers.some(
      (item) => item.subscriberId === userId,
    );
    setIsSubscribe(isSubscribed);
  };

  const handleSubscribe = async () => {
    if (!token) return;
    if (!channel?.user?.id) return;
    if (!channelname) return;
    const sub = await subscribe(token, channel?.user?.id);

    // const channelSubId = await sub.channelId;

    const fetch = await getChannel(channelname);
    console.log(fetch);
    setChannel(fetch);
    let isSubscribed = fetch?.user.subscribers.some(
      (item) => item.subscriberId === userId,
    );
    setIsSubscribe(isSubscribed);
  };

  return {
    channel,
    setChannel,
    isSubscribe,
    setIsSubscribe,
    userId,
    token,
    handleUnSubscribe,
    handleSubscribe,
  };
}
