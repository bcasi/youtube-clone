import "./TopBaar.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaYoutube } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

export default function TopBar({
  width,
  setWidth,
  search,
  setSearch,
  token,
  setToken,
  profilePic,
  setProfilePic,
}) {
  // const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setProfilePic(localStorage.getItem("profilePicture"));
  }, [setToken, setProfilePic]);

  const goToUpload = () => {
    window.location = "/upload";
  };
  const goToHome = () => {
    window.location = "/";
  };
  const goToSignIn = () => {
    window.location = "/signin";
  };

  const handleSignout = () => {
    localStorage.clear();
    window.location = "/signin";
  };

  const burgerMenuClick = () => {
    console.log(width);
    if (width === "50") {
      setWidth("250");
    } else {
      setWidth("50");
    }
  };
  return (
    <div className="topbar_container flex-1 ">
      <div className="text-white  text-2xl ml-5 flex">
        <button
          onClick={burgerMenuClick}
          className=" hover:bg-gray-500 hover:rounded-3xl cursor-pointer p-2"
        >
          <RxHamburgerMenu />
        </button>
        <div
          className="flex cursor-pointer justify-center items-center ml-3"
          onClick={goToHome}
        >
          <FaYoutube />
          <p>Youtube</p>
        </div>
      </div>

      <div className="flex justify-center items-center relative">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="border-l-0 w-134 placeholder-indigo-50 rounded-r-none "
        />
        {/* <button className="cursor-pointer bg-gray-400  h-full flex items-center justify-center w-10 rounded-r-2xl">
          <CiSearch className="text-white" />
        </button> */}
      </div>
      {token ? (
        <div className="flex gap-2 ">
          <button onClick={goToUpload} className="upload">
            Upload
          </button>

          <img
            className="max-w-12 rounded-full cursor-pointer"
            onClick={handleSignout}
            id="upload-btn"
            src={profilePic}
          />
          <Tooltip anchorSelect="#upload-btn" place="bottom">
            Sign Out
          </Tooltip>
        </div>
      ) : (
        <button onClick={goToSignIn}>Sigin</button>
      )}
    </div>
  );
}
