import { ReactElement, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import LandingPage from "../components/landing/LandingPage";
import DevCheck from "../dev-check/DevCheck";

function App(): ReactElement {
  const password: string = "rmssd";
  const [userInput, setUserInput] = useState<string>("rmssd");

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
          <LandingPage />
        )}
      </div>
    </BrowserRouter>
  );
}

// function App(): ReactElement {
//   const password: string = "rmssd";
//   const [userInput, setUserInput] = useState<string>("rmssd");

//   return (
//     <BrowserRouter>
//       <div className="App">
//         {(userInput === "" || userInput !== password) ? (
//           <DevCheck
//             password={password}
//             userInput={userInput}
//             setUserInput={setUserInput}
//           />
//         ) : (
//           <Application />
//         )}
//       </div>
//     </BrowserRouter>
//   );
// }

 export default App;
