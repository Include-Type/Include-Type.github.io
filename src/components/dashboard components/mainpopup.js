import Popupsetting from "./popupsetting";
import { useState } from "react"
import Form from "./formforsave"

function Mainpopup() {
    const [buttonPopup, setButtonPopup] = useState(false);

    return (
        <div>
            <main><button onClick={() => setButtonPopup(true)}>Open to type</button></main>

            <Popupsetting trigger={buttonPopup} setTrigger={setButtonPopup}>
                <Form/>

            </Popupsetting>
        </div>
    );
}
export default Mainpopup;