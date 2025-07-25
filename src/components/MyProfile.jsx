import React, {useEffect, useState} from 'react';
import './MyProfile.css';
import apiService from "../service/apiService.js";
import {useAuth} from "../contexts/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

function MyProfile() {
  const [userInfo, setUserInfo] = useState(null);
  const {logout} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await apiService.getProfile()
      setUserInfo(response);
      console.log("fetched user info: ", response.getProfile())
    };
    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate('/login', {replace: true});
    }
  };

  const handleDeleteMember = async () => {
    const isConfirmed = window.confirm("정말로 회원 탈퇴를 진행하시겠습니까?");
    if (isConfirmed) {
      await apiService.deleteMember();
      navigate('/login', {replace: true});
    }
  };

  return (
      <div className="Profile">
        <h2>My page</h2>
        {userInfo && (
            <div className="profile-container">
              <div className="profile-image">
                {userInfo.picture && <img src={userInfo.picture} alt="Profile" className="profile-picture"/>}
              </div>
              <div className="profile-info">
                <p>{userInfo.name}</p>
                <p>{userInfo.email}</p>
              </div>
            </div>
        )}
        <div className="button-container">
          <button onClick={handleLogout}>{'로그아웃 >'}
          </button>
          <button onClick={handleDeleteMember}>회원탈퇴</button>
        </div>
      </div>
  );
}

export default MyProfile;