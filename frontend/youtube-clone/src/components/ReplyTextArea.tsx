import React from "react";

export default function ReplyTextArea({
  typeReply,
  setTypeReply,
  handlePostReply,
  item,
}) {
  return (
    <div className="flex">
      <textarea
        value={typeReply}
        onChange={(e) => setTypeReply(e.target.value)}
        className="border-b-2 w-full min-w-2xl focus:outline-none focus:border-b-2 pt-3"
      ></textarea>
      <button
        onClick={() => handlePostReply(item.id)}
        className="rounded-2xl border-2 px-2 cursor-pointer"
      >
        Reply
      </button>
    </div>
  );
}
