import React from "react";
import { BiHome } from "react-icons/bi";
import NavIconText from "./NavIconText";
import { IoMdHome } from "react-icons/io";
import { MdSubscriptions } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

export default function NavTop({ width }) {
  const align_items = width === "50" ? "items-center" : "";
  return (
    <div className="flex flex-col">
      <div className={`flex flex-col gap-2 ${align_items}`}>
        <NavIconText
          width={width}
          icon={<IoMdHome />}
          title={"Home"}
          to={"/"}
        />
        <NavIconText
          width={width}
          icon={<MdSubscriptions />}
          title={"Subscriptions"}
          to={"/subscriptions"}
        />
        <NavIconText
          width={width}
          icon={<FaUserCircle />}
          title={"You"}
          to={"/feed/you"}
        />
      </div>
    </div>
  );
}
