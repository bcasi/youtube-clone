import axios from "axios";

const backend_url = "http://localhost:3000";
export const getUser = async (token: string) => {
  try {
    const getUser = await axios.get(backend_url + "/api/userProfile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await getUser.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const watchVideo = async (id: string, token?: string) => {
  try {
    const video = await axios.get(backend_url + "/api/videos/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const res = await video.data;
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getChannel = async (channelName: string) => {
  try {
    const channel = await axios.get(
      backend_url + "/api/channel/" + channelName,
    );
    const res = await channel.data;
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const subscribe = async (token: string, channelId: string) => {
  try {
    const sub = await axios.post(
      backend_url + "/api/subscribe",
      { channelId },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const res = await sub.data;
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const unSubscribe = async (token: string, channelId: string) => {
  try {
    const unsub = await axios.post(
      backend_url + "/api/unsubscribe",
      { channelId },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const res = await unsub.data;
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const subscriptions = async (token: string) => {
  try {
    const all_subscriptions = await axios.get(
      backend_url + "/api/all_subscriptions",

      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const res = await all_subscriptions.data;
    return res;
  } catch (error) {
    console.log(error);
  }
};
