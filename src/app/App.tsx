import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
// import LoginPage from "../components/login/LoginPage";
import LandingPage from "../components/landing/LandingPage";

function App() {
  return (
    <Router>
      <div className="App">
        <LandingPage />
        {/* <LoginPage/> */}
      </div>
    </Router>
  );
}

export default App;
