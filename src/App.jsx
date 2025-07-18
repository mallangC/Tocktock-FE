import './App.css'
import Home from "./pages/Home.jsx";
import {Route, Routes} from "react-router-dom";
import Complete from "./pages/Complete.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import LoginSuccessPage from "./pages/LoginSuccessPage.jsx";
import {AuthProvider} from "./contexts/AuthContext.jsx";

function App() {

  return (
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/loginSuccess" element={<LoginSuccessPage/>}/>
          <Route element={<PrivateRoute/>}>
            <Route path="/" element={<Home/>}/>
            <Route path={"/complete"} element={<Complete/>}/>
            <Route path={"/profile"} element={<Profile/>}/>
            <Route path={"/*"} element={<NotFound/>}/>
          </Route>
        </Routes>
      </AuthProvider>
  );
}

export default App
