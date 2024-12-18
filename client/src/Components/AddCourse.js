import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopHeading from "./TopHeading";
import Header from "./Header";

const AddCourse = () => {
  const navigate = useNavigate();
  const [courseListing, setCourseListing] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    // Mock data
    const mockData = [
      { _id: "1", title: "C Programming", description: "Learn C", price: "50", image: "/Images/cp.jpg" },
      { _id: "2", title: "Python Programming", description: "Learn Python", price: "75", image: "/Images/python.jpg" },
      { _id: "3", title: "Java Programming", description: "Learn Java", price: "80", image: "/Images/java.jpg" }
    ];
    setCourseListing(mockData);
  }, []);

  const handleCourseSelect = (courseId) => {
    setSelectedCourses((prev) => 
      prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]
    );
  };

  const handleConfirmSelection = () => {
    localStorage.setItem("selectedCourses", JSON.stringify(selectedCourses));
    alert("Courses confirmed!");
    navigate("/courses");
  };

  return (
    <div>
      <TopHeading title="Available Courses" />
      <Header />
      <div className="container courses-cnt">
        <div className="row d-flex flex-wrap justify-content-start">
          {courseListing.map((item) => (
            <div className="each-course" key={item._id} style={{ width: "30%", margin: "10px" }}>
              <img src={item.image} alt={item.title} style={{ width: "100%", height: 200 }} />
              <p className="courseTitle">{item.title}</p>
              <p className="courseDescription">{item.description}</p>
              <p className="coursePrice">{item.price} OMR</p>
              <button 
                className={`selectBtn ${selectedCourses.includes(item._id) ? 'selected' : ''}`} 
                onClick={() => handleCourseSelect(item._id)}
              >
                {selectedCourses.includes(item._id) ? 'Deselect' : 'Select'}
              </button>
            </div>
          ))}
        </div>
        <button 
          className="confirmBtn" 
          onClick={handleConfirmSelection} 
          disabled={selectedCourses.length === 0}
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
};

export default AddCourse;