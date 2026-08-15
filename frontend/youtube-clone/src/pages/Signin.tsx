import axios from "axios";
import "./Signin.css";

import React, { useState } from "react";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();
  const [signIn, setSignin] = useState({
    username: "",
    password: "",
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
        "http://localhost:3000/api/signin",
        signIn,
      );
      const data = await signup.data;
      localStorage.setItem("token", data.token);
      navigate("/");
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

        <button className="submit" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
}
