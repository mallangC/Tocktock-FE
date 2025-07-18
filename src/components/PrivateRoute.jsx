import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const PrivateRoute = () => {
  const { isLoggedIn, loadingAuth } = useAuth();

  if (loadingAuth) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>인증 상태 확인 중...</div>;
  }

  if (!isLoggedIn) {
    console.log("PrivateRoute: 로그인되지 않아, 로그인 페이지로 리다이렉트합니다.");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;