import axios from "axios";
import "./Signup.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [signIn, setSignin] = useState({
    username: "",
    password: "",
    gender: "",
    channelName: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("first", signIn);

    try {
      const signup = await axios.post(
        "http://localhost:3000/api/signup",
        signIn,
      );
      const data = await signup.data;
      localStorage.setItem("token", data.token);
      navigate("/signin");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="form_container">
      <form onSubmit={handleSubmit}>
        <div className="dual_container">
          <label>Username</label>
          <input
            className=""
            type="text"
            name="username"
            value={signIn.username}
            onChange={handleChange}
          />
        </div>
        <div className="dual_container">
          <label>Password</label>
          <input
            className=""
            type="password"
            name="password"
            value={signIn.password}
            onChange={handleChange}
          />
        </div>
        <div className="dual_container">
          <label>Gender</label>
          <select
            className="gender"
            name="gender"
            value={signIn.gender}
            onChange={handleChange}
          >
            <option value={""}>Select gender</option>
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
            <option value={"Other"}>Other</option>
          </select>
        </div>
        <div className="dual_container">
          <label>Channel Name</label>
          <input
            className=""
            type="text"
            name="channelName"
            value={signIn.channelName}
            onChange={handleChange}
          />
        </div>
        <button className="submit" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
