import axios from "axios";
import "./Upload.css";
import React, { useState } from "react";

export default function Upload() {
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [title, setTitle] = useState("");
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
      title,
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

  const handleTitle = (e) => {
    const value = e.target.value;
    setTitle(value);
  };

  return (
    <div className="flex ml-80 min-h-75 flex-col justify-center items-center bg-gray-500 rounded-2xl max-w-lg ">
      <div className="flex flex-col items-center">
        <label className="text-2xl text-white">Upload Video</label>
        <input
          type="file"
          className="text-2xl text-white cursor-pointer"
          placeholder="upload video"
          onChange={videoHandler}
        />
      </div>
      <div className="flex flex-col items-center">
        <label className="text-2xl text-white">Upload Thumbnail</label>
        <input
          className="text-2xl text-white cursor-pointer"
          type="file"
          onChange={thumbnailHandler}
        />
      </div>

      <div className="flex flex-col items-center">
        <label className="text-2xl text-white">Title</label>
        <input
          type="text"
          className="w-112.5 text-white "
          placeholder="Enter Title"
          value={title}
          onChange={handleTitle}
        />
      </div>

      <button
        className="border-white border-2 px-3 rounded-md w-24 mt-7 cursor-pointer"
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
}
