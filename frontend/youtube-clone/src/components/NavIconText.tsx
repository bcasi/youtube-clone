import React from "react";
import { Link } from "react-router-dom";

export default function NavIconText({
  icon,
  title,
  width,
  to,
}: {
  icon: React.ReactNode;
  title: string;
  width: string;
  to: string;
}) {
  console.log(width);
  return (
    <Link
      to={to}
      className={`${width == "50" ? "flex flex-col items-center" : "flex gap-2"} py-2 px-4 cursor-pointer hover:bg-gray-500 rounded-md`}
    >
      <div className="text-2xl text-white">{icon}</div>
      {title && (
        <p className={`${width == "50" ? "text-[10px]" : "gap-2"} text-white`}>
          {title}
        </p>
      )}
    </Link>
  );
}
