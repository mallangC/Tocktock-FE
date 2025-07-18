import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; // useAuth 훅 임포트

function LoginSuccessPage() {
  const navigate = useNavigate();
  const { loginSuccess, checkAuthStatus } = useAuth(); // AuthContext에서 함수 가져오기

  useEffect(() => {
    const handleLoginSuccess = async () => {
      loginSuccess();

      // 0.5초 대기 후 홈으로 리다이렉트
      const timer = setTimeout(() => {
        navigate('/', { replace: true });
      }, 500);
      return () => clearTimeout(timer);
    };

    handleLoginSuccess();
  }, [navigate, loginSuccess, checkAuthStatus]); // 의존성 배열에 포함

  return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>로그인 성공!</h2>
        <p>잠시 후 홈으로 이동합니다...</p>
      </div>
  );
}

export default LoginSuccessPage;