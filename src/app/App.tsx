import React, { ReactElement, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import LandingPage from "../components/landing/LandingPage";
import Application from "../components/application/Application";
import DevCheck from "../dev-check/DevCheck";

function App(): ReactElement {
  const password: string = "rmssd";
  const [userInput, setUserInput] = useState<string>("");

  return (
    // <Router>
    //   <div className="App">
    //     {userInput === "" || userInput !== password ? (
    //       <DevCheck
    //         password={password}
    //         userInput={userInput}
    //         setUserInput={setUserInput}
    //       />
    //     ) : (
    //       <LandingPage />
    //     )}
    //   </div>
    // </Router>
    <Application/>
  );
}

export default App;
