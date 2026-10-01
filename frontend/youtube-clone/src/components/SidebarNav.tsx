import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import NavTop from "./NavTop";

export default function SidebarNav({ width, setWidth }) {
  return (
    <div className="px-5 py-2 h-screen">
      <div className={`w-[${width}px] flex flex-col`}>
        <NavTop width={width} />
      </div>
    </div>
  );
}
