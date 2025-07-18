import './Profile.css'
import Header from "../components/Header.jsx";
import MyProfile from "../components/MyProfile.jsx";

const Profile = () => {
  return (
      <div className={"Profile"}>
        <Header/>
        <MyProfile/>
      </div>
  )
}

export default Profile