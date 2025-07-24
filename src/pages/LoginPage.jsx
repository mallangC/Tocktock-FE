import React from 'react';
import './LoginPage.css';

function LoginPage() {
    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_BASE_URL}/oauth2/authorization/google`;
        // window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`;

    };

    return (
        <div className="login-container">
          <img className="logo" src="../../public/loginLogoAndText.png" alt="loginLogoAndText" sizes="50%"/>
          <p className="content">간편한 할일 목록 작성이 <br/> 필요할 때 두잇 톡톡</p>
            <button className="google-login-button" onClick={handleGoogleLogin}>
              <img src="../../public/google_logo.png" alt="google-logo" className="button-icon"/>
                <span className="button-text">Google로 계속하기</span>
            </button>
          <p className="end-text">로그인 오류 및 문의&nbsp;
          <a href="mailto:info@yourcompany.com">ckj9001@gmail.com</a>
          </p>
        </div>
    );
}

export default LoginPage;