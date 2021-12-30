import { PopupSetting } from "./PopupSetting";
import { useState } from "react";
import CalendarForm from "./CalendarForm";

function Mainpopup() {
  const [buttonPopup, setButtonPopup] = useState(false);

  return (
    <div>
      <main>
        <button onClick={() => setButtonPopup(true)}>Open to type</button>
      </main>

      <PopupSetting trigger={buttonPopup} setTrigger={setButtonPopup}>
        <CalendarForm />
      </PopupSetting>
    </div>
  );
}
export default Mainpopup;
