import React from 'react'
import "./Popup.css"

function Popupsetting2(props){
    return(
        <div className="popup">
        <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setDatePick(false)}>close</button>
            {props.children}


        </div>  
    </div>
    
    );

}

function Popupsetting(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
                {props.children}


            </div>
            
        </div>
    ): "";
}export default Popupsetting;
export {Popupsetting2};