import React from "react";
import ReplyTextArea from "./ReplyTextArea";

export default function CommentsSection({
  item,
  setIsReply,
  isReply,
  setTypeReply,
  typeReply,
  handlePostReply,
  showReply,
  showReplies,
}) {
  return (
    <div className="flex flex-col w-full items-start">
      <p className="text-white">{item?.content}</p>
      <button
        onClick={() => setIsReply((isId) => (isId == "" ? item.id : ""))}
        className="cursor-pointer"
      >
        Reply
      </button>
      {isReply == item.id && (
        <ReplyTextArea
          setTypeReply={setTypeReply}
          typeReply={typeReply}
          handlePostReply={handlePostReply}
          item={item}
        />
      )}
      <div
        onClick={() => showReply(item.id)}
        className="cursor-pointer text-white"
      >
        {item?.replies?.length} Replies &#8595;
      </div>
      {showReplies?.length >= 1 && (
        <div className="flex flex-col items-start">
          {showReplies?.map((replies) => (
            <p className="text-white">
              {replies.commentId == item.id && replies.content}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
