import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import TopHeading from "./TopHeading";
import Header from "./Header";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState({
    username: false,
    password: false,
  });

  useEffect(() => {
    const isLogin = localStorage.getItem("isLoggedIn");
    if (isLogin) {
      navigate("/");
    }
  }, [navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Reset error messages
    setErrMsg({
      username: false,
      password: false,
    });

    if (!data.username) {
      setErrMsg((prev) => ({ ...prev, username: true }));
      return;
    }
    if (!data.password) {
      setErrMsg((prev) => ({ ...prev, password: true }));
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/login", {
        username: data.username,
        password: data.password,
      });
      if (response.status === 200) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userId", response.data.user._id);
        setData({ username: "", password: "" });
        navigate("/mypage");
        alert("Logged in successfully");
      }
    } catch (error) {
      alert(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  return (
    <div>
      <TopHeading title="Login" />
      <Header />
      <div className="container justify-content-center d-flex">
        <div className="row">
          <div className="col-sm-12">
            <div className="login-cnt">
              <p className="login-heading">Login to your page</p>
              <form onSubmit={submitHandler}>
                <div className="mb-10">
                  <label>UserName:</label>
                  <input
                    type="text"
                    value={data.username}
                    onChange={handleOnChange}
                    name="username"
                    className="usernameinput"
                  />
                  {errMsg.username && (
                    <span className="err-msg">Username is required</span>
                  )}
                </div>
                <div className="mb-10">
                  <label>Password:</label>
                  <input
                    type="password"
                    value={data.password}
                    onChange={handleOnChange}
                    name="password"
                    className="passwordinput"
                  />
                  {errMsg.password && (
                    <span className="err-msg">Password is required</span>
                  )}
                </div>
                <button type="submit" className="loginBtn">
                  Login
                </button>
                <span className="if-you">
                  If you don't have an account yet:{" "}
                  <Link className="signupbtn" to={"/signup"}>
                    SignUp
                  </Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
