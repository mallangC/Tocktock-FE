import './Header.css'
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.jsx";

const Header = () => {
  const navigate = useNavigate();
  const { logout} = useAuth();

  const handleLogout = async () => {
    const success = await logout(); // AuthContext의 logout 함수 호출
    if (success) {
      navigate('/login', { replace: true });
    }
  };

  return (
      <div className={"Header"}>
        <Link to="/complete">완료 목록</Link>
        <Link to="/">할 일 목록</Link>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
  )
}

export default Header