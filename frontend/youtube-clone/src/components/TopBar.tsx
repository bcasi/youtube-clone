import { useNavigate } from "react-router-dom";
import "./TopBaar.css";
import React from "react";

export default function TopBar() {
  // const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const goToUpload = () => {
    window.location = "/upload";
  };
  const goToHome = () => {
    window.location = "/";
  };

  return (
    <div className="topbar_container">
      <div className="logo" onClick={goToHome}>
        Youtube
      </div>
      {token && (
        <button onClick={goToUpload} className="upload">
          Upload
        </button>
      )}
    </div>
  );
}
