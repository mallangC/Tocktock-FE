import React, {useEffect, useState} from 'react';
import './MyProfile.css';
import apiService from "../service/apiService.js";

function MyProfile() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await apiService.getProfile()
      setUserInfo(response);
    };
    fetchUserInfo();
  }, []);


  const handleLogout = async () => {
    await apiService.logout();
  };

  return (
      <div className="success-container">
        <h2>로그인 완료!</h2>
        {userInfo && (
            <div className="user-info-card">
              {userInfo.picture && <img src={userInfo.picture} alt="Profile" className="profile-picture"/>}
              <p>환영합니다, **{userInfo.name}**님!</p>
              <p>이메일: {userInfo.email}</p>
              <p>역할: {userInfo.role}</p>
            </div>
        )}
        <button className="logout-button" onClick={handleLogout}>로그아웃</button>
      </div>
  );
}

export default MyProfile;