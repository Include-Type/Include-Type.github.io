import React, { Dispatch } from "react";
import "./PopupSetting.css";

interface PopupSetting2Props {
  setDatePick: Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

interface PopupSettingProps {
  trigger: boolean;
  setTrigger: Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

function PopupSetting2(props: PopupSetting2Props) {
  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setDatePick(false)}>
          close
        </button>
        {props.children}
      </div>
    </div>
  );
}

function PopupSetting(props: PopupSettingProps) {
  return props.trigger ? (
    <div className="popup_setting">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          close
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export { PopupSetting };
export { PopupSetting2 };
