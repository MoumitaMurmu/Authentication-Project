

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';

function Profile() {
  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetch(`https://dummyjson.com/users/${user.id}`)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error("Could not fetch user data");
          }
        })
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [user]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className="profile-page">
    <div className="profile-background">
    <h1>WELCOME TO YOUR PROFILE</h1>
    
    </div>
     
      {error && <div>{error}</div>}
      {userData && (
        <div>
          
          <div className="image-container">
          <div className="image-container-second">
          <img src={userData.image} alt="User Avatar" id="image"/>
          </div>
          </div>
          <span id="user-name"><h1>{userData.firstName} {userData.lastName}</h1></span>
          
          <div className="user-details">
          <p prefix={<LockOutlined />}>ID: {userData.id}</p>
          <p prefix={<UserOutlined />}>Username: {userData.username}</p>
          <p>Gender: {userData.gender}</p>
          <p>Age: {userData.age}</p>
          <p prefix={<EnvironmentOutlined />}>City: {userData.address.city}</p>
          <p prefix={<MailOutlined />}>Email: <span style={{color: "blue"}}>{userData.email}</span></p>
          <p prefix={<PhoneOutlined />}>Phone: {userData.phone}</p>
          </div>

          
          
        </div>
      )}

      <div>
        <button id="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;
