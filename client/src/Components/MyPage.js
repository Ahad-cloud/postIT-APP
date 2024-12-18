import React, { useState, useEffect } from "react";
import Axios from "axios";
import TopHeading from "./TopHeading";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const [data, setDate] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLoggedIn");
    if (isLogin) {
      fetchData();
    } else {
      navigate("/login");
    }
  }, []);

  const fetchData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await Axios.post(
        "http://localhost:3001/get-all-purchased-courses",
        {
          userId,
        }
      );
      const totalPrice = response.data.courses.reduce(
        (sum, item) => sum + item.price,
        0
      );
      setTotalPrice(totalPrice);
      setDate(response.data.courses);
    } catch (error) {
      alert(
        error.response?.data?.message || error.message || "something went wrong"
      );
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="">
      <TopHeading title="My Page" />
      <Header />
      <div className="container courses-cnt">
        <div className="row">
          <div className="col-sm-12">
            {data.length > 0 ? (
              <div className="postion-relative">
                {data?.map((item) => (
                  <div className="my-course">
                    <img src={item.image} className="mypage-img" />
                    <div className="d-flex ">
                      <p className="courseTitle">Title: </p>
                      <p className="courseName">{item.title}</p>
                    </div>
                    <button className="startcoursebtn">Start Course</button>
                  </div>
                ))}
                {totalPrice && (
                  <div className="d-flex total-price">
                    <p>Total:</p>
                    <p>{totalPrice} OMR</p>
                  </div>
                )}
              </div>
            ) : (
              <div>No purchased course yet, please buy any</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyPage;
