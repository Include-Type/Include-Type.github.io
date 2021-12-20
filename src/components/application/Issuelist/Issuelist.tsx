import React, { CSSProperties, ReactElement, useEffect, useState } from 'react'
import "./Issuelist.css";
import EachIssue from "./Issue/Issue"
import { ProjectIssue, IssuePriority } from '../../../models/ProjectIssue';
import { ProjectIssueDto } from '../../../dtos/ProjectIssueDto';
import { Button, CircularProgress, Snackbar } from '@mui/material';
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

interface IssuelistProps {
    user: User
};

export default function Issuelist(props: IssuelistProps): ReactElement {
    // const classes = useStyles();

    const [issues, setIssues] = useState<ProjectIssue[]>([]);
    const [issueCount, setIssueCount] = useState<number>(issues.length);
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
        async function getIssuesByUsername(): Promise<void> {
            try {
                const response = await fetch(`https://include-type.herokuapp.com/api/project/getissuesbyusername/${props.user.username}`, {
                    credentials: "include"
                });
                if (response.ok) {
                    // console.log("Issues received!");
                    const jsonIssues: ProjectIssue[] = await response.json();
                    // console.log(jsonIssues);
                    setIssues(jsonIssues);
                    setIssueCount(jsonIssues.length);
                    setLoading(0);
                } else {
                    throw new Error();
                }
            } catch (error) {
                // console.log("Error!");
                setIssues([]);
                setIssueCount(0);
                setLoading(0);
            }
        }

        getIssuesByUsername();
    }, [props.user]);

    async function updateIssuesByUsername(e: React.FormEvent): Promise<void> {
        setStatus("started");
        e.preventDefault();
        const updatedIssues: ProjectIssueDto = {
            issues: issues
        };

        try {
            const response = await fetch(`https://include-type.herokuapp.com/api/project/updateissues/${props.user.username}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(updatedIssues)
            });
            if (response.ok) {
                setStatus("stopped");
                setUpdateInfo("Issues Updated!");
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

    function handleClose(event?: React.SyntheticEvent, reason?: string) {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    function strikeIssue(id: string): void {
        let index = issues.findIndex(t => t.id === id);
        issues[index].completed = !issues[index].completed;
        setIssues(issues);
        setExecFuse((prevState) => (prevState + 1));
    }

    function deleteIssue(id: string): void {
        let index = issues.findIndex(t => t.id === id);
        issues.splice(index, 1);
        setIssues(issues);
        setIssueCount((prevState) => (prevState - 1));
    }

    function changeIssuePriority(id: string, priority: string): void {
        let index = issues.findIndex(t => t.id === id);
        issues[index].priority = priority as IssuePriority;
        setIssues(issues);
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
                <div className="issuelist_outer_container">
                    <CircularProgress size={60} style={{ color: "rgb(9, 77, 145)" }} />
                </div>
            ) : (
                <div className="issuelist_outer_container">
                    <div className="issuelist_container">
                        {(issueCount > 0) && (execFuse >= 0) ? (
                            <div className="for_scroll">
                                {issues.map((issue: ProjectIssue) => (
                                    <div key={issue.id}>
                                        <EachIssue
                                            data={issue}
                                            changeIssuePriority={changeIssuePriority}
                                            strikeIssue={strikeIssue}
                                            deleteIssue={deleteIssue}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="empty_text">You're all caught up!<br></br>🚀</p>
                        )}
                    </div>
                    <div className="sync_container">
                        <Button
                            disabled={status === "started" ? true : false}
                            type="submit"
                            onClick={(e) => updateIssuesByUsername(e)}
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
