import React from "react";
import type { Video } from "../components/VideoScreen";

export default function RightVideosSection({ video }: { video: Video }) {
  return (
    <div className="all_videos">
      <img className="thumbnail" src={video.thumbnail} />
    </div>
  );
}
