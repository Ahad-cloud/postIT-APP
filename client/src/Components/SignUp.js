import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import TopHeading from "./TopHeading";
import Header from "./Header";

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errMsg, setErrMsg] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    matchPassword: "",
  });

  useEffect(() => {
    const isLogin = localStorage.getItem("isLoggedIn");
    if (isLogin) {
      navigate("/");
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", data); // Debug log

    // Reset error messages
    setErrMsg({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      matchPassword: "",
    });

    // Validate inputs
    if (data.username === "") {
      setErrMsg((prev) => ({ ...prev, username: "Username is required" }));
      return;
    }
    if (data.email === "") {
      setErrMsg((prev) => ({ ...prev, email: "Email is required" }));
      return;
    }
    if (data.password === "") {
      setErrMsg((prev) => ({ ...prev, password: "Password is required" }));
      return;
    }
    if (data.confirmPassword === "") {
      setErrMsg((prev) => ({
        ...prev,
        confirmPassword: "Confirm Password is required",
      }));
      return;
    }
    if (data.confirmPassword !== data.password) {
      setErrMsg((prev) => ({
        ...prev,
        matchPassword: "Passwords do not match",
      }));
      return;
    }

    // Submit data
    try {
      const response = await Axios.post("http://localhost:3001/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      if (response.status === 201) {
        alert("User created successfully");
        navigate("/login");
      }
    } catch (error) {
      alert(
        error.response?.data?.message || error.message || "Something went wrong"
      );
      console.error("Error:", error.response?.data?.message || error.message);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    console.log(`${name}: ${value}`); // Debug log
  };

  return (
    <div>
      <TopHeading title="Sign Up" />
      <Header />
      <div className="container justify-content-center d-flex">
        <div className="row">
          <div className="col-sm-12">
            <div className="login-cnt">
              <p className="login-heading">Create your account</p>
              <form onSubmit={submitHandler}>
                <div className="mb-10">
                  <div className="d-flex">
                    <label>Username:</label>
                    <input
                      type="text"
                      value={data.username}
                      onChange={handleOnChange}
                      name="username"
                      className="usernameinput"
                    />
                  </div>
                  {errMsg.username && (
                    <span className="err-msg">{errMsg.username}</span>
                  )}
                </div>
                <div className="mb-10">
                  <div className="d-flex">
                    <label>Email:</label>
                    <input
                      type="email"
                      value={data.email}
                      onChange={handleOnChange}
                      name="email"
                      className="passwordinput"
                    />
                  </div>
                  {errMsg.email && (
                    <span className="err-msg">{errMsg.email}</span>
                  )}
                </div>
                <div className="mb-10">
                  <div className="d-flex">
                    <label>Password:</label>
                    <input
                      type="password"
                      value={data.password}
                      onChange={handleOnChange}
                      name="password"
                      className="passwordinput"
                    />
                  </div>
                  {errMsg.password && (
                    <span className="err-msg">{errMsg.password}</span>
                  )}
                </div>
                <div className="mb-10">
                  <div className="d-flex">
                    <label>Confirm Password:</label>
                    <input
                      type="password"
                      value={data.confirmPassword}
                      onChange={handleOnChange}
                      name="confirmPassword"
                      className="passwordinput"
                    />
                  </div>
                  {errMsg.confirmPassword && (
                    <span className="err-msg">{errMsg.confirmPassword}</span>
                  )}
                  {errMsg.matchPassword && (
                    <span className="err-msg">{errMsg.matchPassword}</span>
                  )}
                </div>
                <button type="submit" className="loginBtn">
                  Signup
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
