import { ToDo } from "../UserDashboard";
import "./CalenderWork.css";
import MultidatePicker from "./MultidatePicker";

interface CalendarWorkProps {
  toDos: ToDo[];
  setToDos: React.Dispatch<React.SetStateAction<ToDo[]>>;
  saveToDos: (data: ToDo[]) => void;
}

export default function CalendarWork(props: CalendarWorkProps) {
  return (
    <div className="calender-work">
      <div className="popupform_main">
        <h1>Date Selector</h1>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <MultidatePicker
          toDos={props.toDos}
          setToDos={props.setToDos}
          saveToDos={props.saveToDos}
        />
      </div>
    </div>
  );
}
