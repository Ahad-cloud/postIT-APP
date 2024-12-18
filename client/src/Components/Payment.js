import React, { useEffect, useState } from "react";
import Axios from "axios";
import TopHeading from "./TopHeading";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    account: "",
    cvv: "",
    password: "",
    expiryDate: "",
  });

  const [errMsg, setErrMsg] = useState({
    account: false,
    cvv: false,
    password: false,
    expiryDate: false,
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const courseId = localStorage.getItem("courseId");
    if (!userId || !courseId) {
      navigate("/login");
    }
  }, [navigate]);

  const submitHandler = async () => {
    // Reset error messages
    setErrMsg({
      account: false,
      cvv: false,
      password: false,
      expiryDate: false,
    });

    // Validate input
    if (!data.account) setErrMsg((prev) => ({ ...prev, account: true }));
    if (!data.cvv) setErrMsg((prev) => ({ ...prev, cvv: true }));
    if (!data.expiryDate) setErrMsg((prev) => ({ ...prev, expiryDate: true }));
    if (!data.password) setErrMsg((prev) => ({ ...prev, password: true }));

    if (Object.values(errMsg).some(Boolean)) return;

    const userId = localStorage.getItem("userId");
    const courseId = localStorage.getItem("courseId");

    try {
      const response = await Axios.post("http://localhost:3001/buy-course", {
        userId,
        courseId,
      });
      if (response.status === 200) {
        alert("Course bought successfully"); // Notification
        navigate("/mypage");
      }
    } catch (error) {
      alert(
        error.response?.data?.message || error.message || "Something went wrong"
      );
      console.error("Error fetching data:", error);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <TopHeading title="Pay Now" />
      <Header />
      <div className="container justify-content-center d-flex">
        <div className="row">
          <div className="col-sm-12">
            <div className="login-cnt">
              <p className="login-heading">Enter your Information</p>
              <div className="mb-10">
                <label>Bank Account:</label>
                <input
                  type="text"
                  value={data.account}
                  onChange={handleOnChange}
                  name="account"
                  className="usernameinput"
                />
                {errMsg.account && (
                  <span className="err-msg">Bank Account is required</span>
                )}
              </div>

              <div className="mb-10">
                <label>CVV No:</label>
                <input
                  type="text"
                  value={data.cvv}
                  onChange={handleOnChange}
                  name="cvv"
                  className="passwordinput"
                />
                {errMsg.cvv && <span className="err-msg">CVV is required</span>}
              </div>

              <div className="mb-10">
                <label>Expiry Date:</label>
                <input
                  type="text"
                  value={data.expiryDate}
                  onChange={handleOnChange}
                  name="expiryDate"
                  className="passwordinput"
                />
                {errMsg.expiryDate && (
                  <span className="err-msg">Expiry Date is required</span>
                )}
              </div>

              <div className="mb-10">
                <label>Password:</label>
                <input
                  type="text"
                  value={data.password}
                  onChange={handleOnChange}
                  name="password"
                  className="passwordinput"
                />
                {errMsg.password && (
                  <span className="err-msg">Password is required</span>
                )}
              </div>
              <button className="loginBtn" onClick={submitHandler}>
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
