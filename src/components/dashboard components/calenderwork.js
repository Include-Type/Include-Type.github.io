import React from "react";
import "./Calenderwork.css";
import Picker from "./multidatepicker";
import Form from "./formforsave";
import Mainpopup from "./mainpopup"




function Calenderwork() {
    return (
        <div className="calender-work">
            <div className="popupform_main">
                <Mainpopup/>
            </div>
            <div>
                <Picker/>
            </div>
        </div>
    );
}
export default Calenderwork;