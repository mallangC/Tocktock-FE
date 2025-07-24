import './Header.css'
import {NavLink} from "react-router-dom";

const Header = () => {

  return (
      <div className={"Header"}>
        <NavLink to="/complete" className={({isActive}) => isActive ? "nav-button active-nav-button" : "nav-button"}>
          완료 목록</NavLink>
        <NavLink to="/" className={({isActive}) => isActive ? "nav-button active-nav-button" : "nav-button"}>
          오늘 할 일</NavLink>
        <NavLink to="/profile" className={({isActive}) => isActive ? "nav-button active-nav-button" : "nav-button"}
        >내 정보</NavLink>
      </div>
  )
}

export default Header