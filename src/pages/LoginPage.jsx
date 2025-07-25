import React from 'react';
import './LoginPage.css';
import GoogleLogo from "../../public/google_logo.png"
import TocktockLogo from "../../public/loginLogoAndText.png"


function LoginPage() {
    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_BASE_URL || "https://api.tock-tock.com"}/oauth2/authorization/google`;
    };

    return (
        <div className="login-container">
          <img className="logo" src={TocktockLogo} alt="loginLogoAndText" sizes="50%"/>
          <p className="content">간편한 할일 목록 작성이 <br/> 필요할 때 두잇 톡톡</p>
            <button className="google-login-button" onClick={handleGoogleLogin}>
              <img src={GoogleLogo} alt="google-logo" className="button-icon"/>
                <span className="button-text">Google로 계속하기</span>
            </button>
          <p className="end-text">로그인 오류 및 문의&nbsp;
          <a href="mailto:ckj9001@gmail.com">ckj9001@gmail.com</a>
          </p>
        </div>
    );
}

export default LoginPage;