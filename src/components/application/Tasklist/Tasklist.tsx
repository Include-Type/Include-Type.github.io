import React, { CSSProperties, useState } from 'react'
import "./Tasklist.css";
import EachTask from "./Task/Task"
import { ProjectTask, TaskPriority } from '../../../models/ProjectTask';
import { Button, CircularProgress, Snackbar } from '@mui/material';
// import { makeStyles, Theme } from '@mui/material/styles';
import SyncIcon from '@mui/icons-material/Sync';
import MuiAlert, { AlertProps, AlertColor } from '@mui/lab/Alert';

const saveButtonStyle: CSSProperties = {
    width: "7vw",
    height: "4.5vh",
    margin: 0,
    marginRight: "5%",
    fontSize: "1vw",
    fontWeight: "bold",
    letterSpacing: "1px",
    fontFamily: "Nunito",
    transitionDuration: ".5s",
    backgroundColor: "green"
};

// const proPasswordButtonStyle: CSSProperties = {
//     width: "7vw",
//     height: "4.5vh",
//     margin: 0,
//     fontSize: "1vw",
//     fontWeight: "bold",
//     letterSpacing: "1px",
//     fontFamily: "Nunito",
//     transitionDuration: ".5s",
//     backgroundColor: "darkblue"
// };

export default function Tasklist() {
    // const classes = useStyles();

    const [tasks, setTasks] = useState<ProjectTask[]>([
        {
            id: "1",
            projId: "Project-Id",
            projName: "Project Name",
            title: "Task Title 1",
            date: 'July-05-2021',
            details: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam magnam illum voluptatum voluptatem unde amet deserunt recusandae dolorum totam veritatis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, magnam asperiores quo nobis placeat suscipit aperiam, distinctio adipisci aut saepe alias eum doloremque impedit! Ex atque cupiditate animi! Itaque eaque rem expedita vitae nisi numquam. Magni error omnis minima possimus, exercitationem ab ducimus, accusantium illo veritatis provident eum sed porro?",
            deadline: 'Feb-10-2021',
            assigned: "Adam - Eve",
            completed: true,
            priority: "High"
        },
        {
            id: "2",
            projId: "Project-Id",
            projName: "Project Name",
            title: "Task Title 2 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas aperiam repellendus unde.",
            date: 'July-05-2021',
            details: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam magnam illum voluptatum voluptatem unde amet deserunt recusandae dolorum totam veritatis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, magnam asperiores quo nobis placeat suscipit aperiam, distinctio adipisci aut saepe alias eum doloremque impedit! Ex atque cupiditate animi! Itaque eaque rem expedita vitae nisi numquam. Magni error omnis minima possimus, exercitationem ab ducimus, accusantium illo veritatis provident eum sed porro?",
            deadline: 'Feb-10-2021',
            assigned: "Adam - Eve",
            completed: true,
            priority: "Medium"
        },
        {
            id: "3",
            projId: "Project-Id",
            projName: "Project Name",
            title: "Task Title 3",
            date: 'July-05-2021',
            details: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam magnam illum voluptatum voluptatem unde amet deserunt recusandae dolorum totam veritatis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, magnam asperiores quo nobis placeat suscipit aperiam, distinctio adipisci aut saepe alias eum doloremque impedit! Ex atque cupiditate animi! Itaque eaque rem expedita vitae nisi numquam. Magni error omnis minima possimus, exercitationem ab ducimus, accusantium illo veritatis provident eum sed porro?",
            deadline: 'Feb-10-2021',
            assigned: "Adam - Eve",
            completed: false,
            priority: "Low"
        },
        {
            id: "4",
            projId: "Project-Id",
            projName: "Project Name",
            title: "Task Title 4",
            date: 'July-05-2021',
            details: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam magnam illum voluptatum voluptatem unde amet deserunt recusandae dolorum totam veritatis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, magnam asperiores quo nobis placeat suscipit aperiam, distinctio adipisci aut saepe alias eum doloremque impedit! Ex atque cupiditate animi! Itaque eaque rem expedita vitae nisi numquam. Magni error omnis minima possimus, exercitationem ab ducimus, accusantium illo veritatis provident eum sed porro?",
            deadline: 'Feb-10-2021',
            assigned: "Adam - Eve",
            completed: false,
            priority: "Medium"
        }
    ]);
    const [taskCount, setTaskCount] = useState<number>(tasks.length);
    const [execFuse, setExecFuse] = useState<number>(0);
    const [status, setStatus] = useState<string>("stopped");

    const [open, setOpen] = useState<boolean>(false);
    const [updateInfo, setUpdateInfo] = useState<string>("");
    const [updateResult, setUpdateResult] = useState<AlertColor | undefined>(undefined);

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    function handleClick() {
        setOpen(true);
    };

    function handleClose(event?: React.SyntheticEvent, reason?: string) {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    function toggleStuff(): void {
        if (status === "stopped") {
            setStatus("started");
            setUpdateInfo("You enabled the spinner");
            setUpdateResult("success");
            handleClick();
        } else {
            setStatus("stopped");
            setUpdateInfo("You disabled the spinner");
            setUpdateResult("error");
            handleClick();
        }
    }

    function strikeTask(id: string): void {
        let index = tasks.findIndex(t => t.id === id);
        tasks[index].completed = !tasks[index].completed;
        setTasks(tasks);
        setExecFuse((prevState) => (prevState + 1));
    }

    function deleteTask(id: string): void {
        let index = tasks.findIndex(t => t.id === id);
        tasks.splice(index, 1);
        setTasks(tasks);
        setTaskCount((prevState) => (prevState - 1));
    }

    function changeTaskPriority(id: string, priority: string): void {
        let index = tasks.findIndex(t => t.id === id);
        tasks[index].priority = priority as TaskPriority;
        setTasks(tasks);
        setExecFuse((prevState) => (prevState + 1));
    }

    return (
        <section id="Application_page">
            <section id="Status"></section>
            <section id="Main_area">
                <section id="Application_menu_area"></section>
                <section id="Application_content_area">
                    <div className="tasklist_outer_container">
                        <div className="tasklist_container">
                            {(taskCount > 0) && (execFuse >= 0) ? (
                                <div className="for_scroll">
                                    {tasks.map((task: ProjectTask) => (
                                        <div key={task.id}>
                                            <EachTask
                                                data={task}
                                                changeTaskPriority={changeTaskPriority}
                                                strikeTask={strikeTask}
                                                deleteTask={deleteTask}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="empty_text">You're all caught up!<br></br>🚀</p>
                            )}
                        </div>
                        <div className="sync_container" onClick={toggleStuff}>
                            <Button
                                disabled={status === "started" ? true : false}
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="medium"
                                style={saveButtonStyle}
                                // className={classes.saveButton}
                                startIcon={status === "started" ? "" : <SyncIcon />}
                            >
                                {status === "started" ? (
                                    <CircularProgress size={26} style={{ color: "white" }} />
                                ) : (
                                    "Sync"
                                )}
                            </Button>
                            <Snackbar
                                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                                open={open}
                                autoHideDuration={3000}
                                onClose={handleClose}
                            >
                                <Alert
                                    onClose={handleClose}
                                    severity={updateResult}
                                    style={{ fontSize: 18 }}
                                >
                                    {updateInfo}
                                </Alert>
                            </Snackbar>
                        </div>
                    </div>
                </section>
            </section>
        </section>
    )
}
