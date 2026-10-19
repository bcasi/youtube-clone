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

export const getComments = async (videoId: string) => {
  try {
    const getAllComments = await axios.get(
      backend_url + `/api/videos/${videoId}/comment`,
    );
    console.log("getAllComments", getAllComments.data);
    const data = await getAllComments.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postComment = async (
  token: string,
  videoId: string,
  content: string,
) => {
  try {
    const postAComment = await axios.post(
      backend_url + `/api/videos/${videoId}/comment`,
      {
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(postAComment);
    const res = await postAComment.data;
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const postReply = async (
  token: string,
  commentId: string,
  content: string,
) => {
  try {
    const postAComment = await axios.post(
      backend_url + `/api/videos/comment/${commentId}/reply`,
      {
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(postAComment);

    const getAllReply = await axios.get(
      backend_url + `/api/videos/comment/${commentId}/reply`,
    );
    console.log("getAllReply", getAllReply);
    const res = await getAllReply.data;
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getReply = async (commentId: string) => {
  try {
    const getAllReply = await axios.get(
      backend_url + `/api/videos/comment/${commentId}/reply`,
    );
    console.log("getAllReply", getAllReply);
    const res = await getAllReply.data;
    return res;
  } catch (error) {
    console.log(error);
  }
};
