import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopHeading from "./TopHeading";
import Header from "./Header";

const CourseListing = () => {
  const navigate = useNavigate();
  const [courseListing, setCourse] = useState([]);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  useEffect(() => {
    const mockData = [
      { _id: "1", title: "C Programming", description: "Learn C", price: "50", image: "/Images/cp.jpg" },
      { _id: "2", title: "Python Programming", description: "Learn Python", price: "75", image: "/Images/python.jpg" },
      { _id: "3", title: "Java Programming", description: "Learn Java", price: "80", image: "/Images/java.jpg" }
    ];
    setCourse(mockData);
  }, []);

  const selectedCourses = JSON.parse(localStorage.getItem("selectedCourses")) || [];
  const filteredCourses = courseListing.filter(item => selectedCourses.includes(item._id));
  const totalPrice = filteredCourses.reduce((total, item) => total + parseFloat(item.price), 0);

  const handlePay = () => {
    setPaymentSuccessful(true);
    alert("Payment successful!");
  };

  const handleStartCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div>
      <TopHeading title="Course Listings" />
      <Header />
      <div className="container courses-cnt">
        <div className="row">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(item => (
              <div className="each-course" key={item._id} style={{ margin: "10px", width: "30%" }}>
                <img src={item.image} alt={item.title} style={{ width: "100%", height: 200 }} />
                <p className="courseTitle">{item.title}</p>
                <p className="courseDescription">{item.description}</p>
                <p className="coursePrice">{item.price} OMR</p>
                {paymentSuccessful && (
                  <button className="startCourseBtn" onClick={() => handleStartCourse(item._id)}>Start Course</button>
                )}
              </div>
            ))
          ) : (
            <div>No courses available to show</div>
          )}
        </div>
        {filteredCourses.length > 0 && (
          <>
            <h3>Total Price: {totalPrice} OMR</h3>
            {!paymentSuccessful && (
              <button className="payBtn" onClick={handlePay}>Pay</button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CourseListing;