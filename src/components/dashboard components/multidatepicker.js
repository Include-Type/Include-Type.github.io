import React, { useEffect, useState } from "react"
import { Calendar, DateObject } from "react-multi-date-picker"
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import colors from "react-multi-date-picker/plugins/colors"
import Settings from "react-multi-date-picker/plugins/settings"
import Toolbar from "react-multi-date-picker/plugins/toolbar"
import "./calenderstyles.css"
import Popupsetting, { Popupsetting2 } from "./popupsetting"
import Form from "./formforsave"
import Mainpopup from "./mainpopup"

const dateObject = new DateObject()

const toDateObject = day => new DateObject(dateObject).setDay(day)

export default function Picker() {

    
    const today = new Date();
    // const yesterday = new DateObject().subtract(1, "day");
    // const today = new DateObject();
    // const tomorrow = new DateObject().add(1, "day");
    // const dayafter = new DateObject().add(2, "day");
    
    // yesterday.color = "yellow";
    today.color = "blue";
    // tomorrow.color = "red";
    // dayafter.color = "green";

    const [buttonPopup, setButtonPopup] = useState(false);

    const [datePick, setDatePick] = useState(false);

    const [prevDateCount, setPrevDateCount] = useState(0);
    
    const [props, setProps] = useState({
        multiple: true,
        value: [],
        plugins: [
            colors({ colors: ["blue", "red","yellow","green"] }),
            <DatePanel sort="color" />,
        ],
    });
    useEffect(()=>{
        function Alert(){
            setDatePick(
                true
            );

        }

        if (props.value.length>prevDateCount){
            
            setPrevDateCount(props.value.length);
            
            Alert();
            
        }
        if (props.value.length<prevDateCount){

            setPrevDateCount(props.value.length);
            
        }
    
    },[props.value])
    
    return (
    <div 
        className="calen"
        style={{ 
        display: "flex", 
        justifyContent: "center" 
        }}
    >
        <Calendar
        {...props}
        onPropsChange={setProps}
        />
        {datePick?(
        <Popupsetting2 setDatePick={setDatePick}>
            <Form/>
        </Popupsetting2>

        ):(<p></p>)}
    </div>
    )
}