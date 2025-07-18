import React, {useState} from 'react';
import './LoginPage.css';

function LoginPage() {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };
  const handleGoogleLogin = () => {
    if (!checked) {
      alert('개인정보 수집 및 이용에 동의해야 로그인을 진행할 수 있습니다.');
      return;
    }
    // Spring Boot OAuth2 로그인 엔드포인트로 리다이렉트
    // window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    window.location.href = 'https://api.tock-tock.com/oauth2/authorization/google';
  };

  return (
      <div className="login-container">
        <h2>할 일 톡톡</h2>
        <button className="google-login-button" onClick={handleGoogleLogin}>
          Google 로그인
        </button>
        <p style={{ marginTop: '20px', fontSize: '0.9em', color: '#555' }}>
          Google 계정으로 로그인 시, 당사의 {' '}
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">개인정보처리방침</a>에 따라
          귀하의 이메일 주소, 이름 등의 정보가 수집 및 이용됩니다.
        </p>
         <label style={{ fontSize: '0.9em', color: '#555' }}>
        <input type="checkbox" checked={checked} onChange={handleCheckboxChange} required /> 개인정보 수집 및 이용에 동의합니다.
      </label>
      </div>
  );
}

export default LoginPage;