import axios from "axios";
import "./Upload.css";
import React, { useState } from "react";

export default function Upload() {
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const videoHandler = async (e) => {
    const file = e.target.files[0];
    console.log(file);

    const response = await axios.post("http://localhost:3000/getPresignedUrl");
    const { putUrl, finalVideoUrl } = response.data;

    const options = {
      method: "PUT",
      url: putUrl,
      headers: { "Content-Type": file.type },
      data: file,
    };

    console.log("finalVideoUrl", finalVideoUrl);

    await axios.request(options);
    setVideoUrl(finalVideoUrl);

    alert("video upload done");
  };
  const thumbnailHandler = async (e) => {
    const file = e.target.files[0];
    console.log(file);

    const response = await axios.post(
      "http://localhost:3000/getPresignedUrlForImageUpload",
    );
    const { putUrl, finalVideoUrl } = response.data;

    console.log("finalImageUrl", finalVideoUrl);

    const options = {
      method: "PUT",
      url: putUrl,
      headers: { "Content-Type": file.type },
      data: file,
    };

    await axios.request(options);
    setThumbnailUrl(finalVideoUrl);

    alert("video upload done");
  };

  const handleUpload = async () => {
    const data = {
      videoUrl: videoUrl,
      thumbnail: thumbnailUrl,
    };
    const postVideo = await axios.post(
      "http://localhost:3000/api/videos",
      data,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
    console.log(postVideo);
  };

  return (
    <div>
      <input type="file" onChange={videoHandler} />
      <input type="file" onChange={thumbnailHandler} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
