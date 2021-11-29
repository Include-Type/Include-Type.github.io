import React, { ReactElement, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import LandingPage from "../components/landing/LandingPage";
import DevCheck from "../dev-check/DevCheck";
import Application from "../components/application/Application";

function App(): ReactElement {
  const password: string = "rmssd";
  const [userInput, setUserInput] = useState<string>("");

  return (
    <BrowserRouter>
      <div className="App">
        {(userInput === "" || userInput !== password) ? (
          <DevCheck
            password={password}
            userInput={userInput}
            setUserInput={setUserInput}
          />
        ) : (
          // <LandingPage />
          <Application />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
