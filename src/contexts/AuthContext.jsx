import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiService from '../service/apiService';
import {useLocation} from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const location = useLocation();

  const checkAuthStatus = useCallback(async () => {
    if (location.pathname === '/login') {
      console.log("AuthContext: 현재 페이지가 /login이므로 초기 인증 확인을 건너뜁니다.");
      setIsLoggedIn(false);
      setLoadingAuth(false);
      return;
    }

    try {
      // 프로필 API 호출을 통해 현재 세션이 유효한지 확인
      await apiService.getProfile();
      setIsLoggedIn(true);
      console.log("AuthContext: 백엔드 세션 유효함. isLoggedIn = true");
    } catch (error) {
      console.log("AuthContext: 백엔드 세션 유효하지 않거나 오류 발생. isLoggedIn = false");
      setIsLoggedIn(false);
    } finally {
      setLoadingAuth(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]); // useCallback으로 감쌌으므로 의존성 배열에 포함

  // 로그인 성공 시 호출될 함수 (AuthContext 외부에서 로그인 완료 후 사용)
  const loginSuccess = useCallback(() => {
    setIsLoggedIn(true);
    console.log("AuthContext: 로그인 성공 처리됨. isLoggedIn = true");
  }, []);

  // 로그아웃 시 호출될 함수
  const logout = useCallback(async () => {
    try {
      await apiService.logout(); // 백엔드 로그아웃 API 호출
      setIsLoggedIn(false); // 프론트엔드 상태 업데이트
      console.log("AuthContext: 로그아웃 성공! isLoggedIn = false");
      return true; // 성공적으로 로그아웃 처리되었음을 알림
    } catch (error) {
      console.error("AuthContext: 로그아웃 실패:", error);
      alert("로그아웃 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
      return false; // 로그아웃 실패를 알림
    }
  }, []);

  const value = {
    isLoggedIn,
    loadingAuth,
    loginSuccess,
    logout,
    checkAuthStatus
  };

  return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};