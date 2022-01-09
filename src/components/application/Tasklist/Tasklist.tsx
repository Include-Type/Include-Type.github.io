import React, { CSSProperties, ReactElement, useEffect, useState } from 'react'
import "./Tasklist.css";
import EachTask from "./Task/Task"
import { ProjectTask, TaskPriority } from '../../../models/ProjectTask';
import { ProjectTaskDto } from '../../../dtos/ProjectTaskDto';
import { Button, CircularProgress, Snackbar, SnackbarCloseReason } from '@mui/material';
// import { makeStyles, Theme } from '@mui/material/styles';
import SyncIcon from '@mui/icons-material/Sync';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';
import { User } from '../../../models/User';
import "../../spinners/Spinners.css";

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

interface TasklistProps {
    user: User
};

export default function Tasklist(props: TasklistProps): ReactElement {
    // const classes = useStyles();

    const [searchKey, setSearchKey] = useState<string>("");

    const [tasks, setTasks] = useState<ProjectTask[]>([]);
    const [taskCount, setTaskCount] = useState<number>(tasks.length);
    const [execFuse, setExecFuse] = useState<number>(0);
    const [status, setStatus] = useState<string>("stopped");
    const [loading, setLoading] = useState<number>(1);

    const [open, setOpen] = useState<boolean>(false);
    const [updateInfo, setUpdateInfo] = useState<string>("");
    const [updateResult, setUpdateResult] = useState<AlertColor | undefined>(undefined);

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    useEffect(() => {
        async function getTasksByUsername(): Promise<void> {
            try {
                const response = await fetch(`https://include-type.herokuapp.com/api/projecttask/gettasksbyusername/${props.user.username}`, {
                    credentials: "include"
                });
                if (response.ok) {
                    // console.log("Tasks received!");
                    const jsonTasks: ProjectTask[] = await response.json();
                    // console.log(jsonTasks);
                    setTasks(jsonTasks);
                    setTaskCount(jsonTasks.length);
                    setLoading(0);
                } else {
                    throw new Error();
                }
            } catch (error) {
                // console.log("Error!");
                setTasks([]);
                setTaskCount(0);
                setLoading(0);
            }
        }

        getTasksByUsername();
    }, [props.user]);

    async function updateTasksByUsername(e: React.FormEvent): Promise<void> {
        setStatus("started");
        e.preventDefault();
        const updatedTasks: ProjectTaskDto = {
            tasks: tasks
        };

        try {
            const response = await fetch(`https://include-type.herokuapp.com/api/projecttask/updatetasksbyusername/${props.user.username}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(updatedTasks)
            });
            if (response.ok) {
                setStatus("stopped");
                setUpdateInfo("Tasks Updated!");
                setUpdateResult("success");
                handleClick();
            } else {
                throw new Error();
            }
        } catch (error) {
            setStatus("stopped");
            setUpdateInfo("Update Failed!");
            setUpdateResult("error");
            handleClick();
        }
    }

    function handleClick() {
        setOpen(true);
    };

    function handleClose(event: Event | React.SyntheticEvent<Element, Event>, reason?: string | SnackbarCloseReason) {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

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
        // <section id="Application_page">
        //     <section id="Status"></section>
        //     <section id="Main_area">
        //         <section id="Application_menu_area"></section>
        //         <section id="Application_content_area">
        <>
            {loading === 1 ? (
                <div className="tasklist_outer_container">
                    <CircularProgress size={60} style={{ color: "rgb(9, 77, 145)" }} />
                </div>
            ) : (
                <div className="tasklist_outer_container">
                    <div className="sync_container">
                        <input
                            type="text"
                            className="form-control search-text"
                            id="search-tasks"
                            placeholder="Search tasks"
                            value={searchKey}
                            onInput={(e) => setSearchKey(e.currentTarget.value)}
                        />
                        {/* <Button
                            // disabled={status === "started" ? true : false}
                            type="submit"
                            // onClick={(e) => updateProjectsByUsername(e)}
                            variant="contained"
                            color="secondary"
                            size="medium"
                            style={searchButtonStyle}
                            // className={classes.saveButton}
                            startIcon={status === "started" ? "" : <SearchIcon />}
                        >
                            {status === "started" ? (
                                <CircularProgress size={26} style={{ color: "white" }} />
                            ) : (
                                "Search"
                            )}
                        </Button> */}
                    </div>
                    <div className="tasklist_container">
                        {(taskCount > 0) && (execFuse >= 0) ? (
                            <div className="for_scroll">
                                {tasks.map((task: ProjectTask) => (
                                    (searchKey === "" ||
                                        task.projName.toLowerCase().includes(searchKey.toLowerCase()) ||
                                        task.title.toLowerCase().includes(searchKey.toLowerCase()) ||
                                        task.details.toLowerCase().includes(searchKey.toLowerCase())) &&
                                    (<div key={task.id}>
                                        <EachTask
                                            data={task}
                                            changeTaskPriority={changeTaskPriority}
                                            strikeTask={strikeTask}
                                            deleteTask={deleteTask}
                                        />
                                    </div>)
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: "center" }}>
                                <p className="empty_text">You're all caught up!</p>
                                <p style={{ fontSize: "5em" }}>🚀</p>
                            </div>
                        )}
                    </div>
                    <div className="sync_container">
                        <Button
                            disabled={status === "started" ? true : false}
                            type="submit"
                            onClick={(e) => updateTasksByUsername(e)}
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
            )}
        </>
        //         </section>
        //     </section>
        // </section>
    )
}
