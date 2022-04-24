import { useEffect, useState } from "react";
import { Calendar } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import colors from "react-multi-date-picker/plugins/colors";
import "./CalenderStyles.css";
import { PopupSetting2 } from "./PopupSetting";
import CalendarForm from "./CalendarForm";
import { ToDo } from "../UserDashboard";

interface MultidatePickerProps {
  toDos: ToDo[];
  setToDos: React.Dispatch<React.SetStateAction<ToDo[]>>;
  saveToDos: (data: ToDo[]) => void;
}

// const dateObject = new DateObject();

// const toDateObject = (day) => new DateObject(dateObject).setDay(day);

export default function MultidatePicker(props0: MultidatePickerProps) {
  // const today = new Date();
  // const yesterday = new DateObject().subtract(1, "day");
  // const today = new DateObject();
  // const tomorrow = new DateObject().add(1, "day");
  // const dayafter = new DateObject().add(2, "day");

  // yesterday.color = "yellow";
  //   today.color = "blue";
  // tomorrow.color = "red";
  // dayafter.color = "green";

  // const [buttonPopup, setButtonPopup] = useState(false);

  const [dateStr, setDateStr] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const [datePick, setDatePick] = useState(false);

  const [prevDateCount, setPrevDateCount] = useState(0);

  const [props, setProps] = useState({
    multiple: true,
    value: [] as any,
    plugins: [
      colors({ colors: ["blue", "red", "yellow", "green"] }),
      <DatePanel sort="color" />,
    ],
  });
  useEffect(() => {
    function Alert() {
      setDatePick(true);
    }

    if (props.value.length > prevDateCount) {
      setPrevDateCount(props.value.length);

      Alert();
      setDateStr(
        `${props.value[0].year}/${props.value[0].month.number}/${props.value[0].day}`
      );
      setColor(props.value[0].color);
    }
    if (props.value.length < prevDateCount) {
      setPrevDateCount(props.value.length);
    }
  }, [prevDateCount, props.value]);

  function setDateAndAgenda(agenda: string): void {
    let toDos: ToDo[] = props0.toDos;
    toDos.push({
      date: dateStr,
      agenda: agenda,
      color: color,
    });
    props0.setToDos(toDos);
    props0.saveToDos(toDos);
  }

  return (
    <div className="dashboard_calendar">
      <Calendar {...props} onPropsChange={setProps} />
      {datePick ? (
        <PopupSetting2 setDatePick={setDatePick}>
          <CalendarForm setDateAndAgenda={setDateAndAgenda} />
        </PopupSetting2>
      ) : (
        <div></div>
      )}
    </div>
  );
}
