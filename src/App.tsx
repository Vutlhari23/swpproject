import React from "react";
import ReactDOM from "react-dom/client"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home.tsx";
import CreateList from "./components/CreateList.tsx";
import ViewList from "./components/ViewList.tsx";
import LoginPage from "./components/Login.tsx";
import SignupPage from "./components/Signup.tsx";
import Profile from "./components/Profile.tsx";


function MainApp() {
  return (
    <BrowserRouter >
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="create-list" element={<CreateList />} />
       <Route path="view-list" element={<ViewList />} />
       <Route path="login" element={<LoginPage />} />
       <Route path="signup" element={<SignupPage />} />
        <Route path="profile" element={<Profile/>} />

      </Routes>
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<MainApp />);

export default MainApp;