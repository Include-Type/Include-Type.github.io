import React, { ReactElement } from "react";
import { User } from "../../models/User";
import "./Dashboard.css";
interface DashboardProps {
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User>>,
    setLoginComplete: React.Dispatch<React.SetStateAction<boolean>>
};

function Dashboard(props: DashboardProps): ReactElement {
    async function logout(): Promise<void> {
        await fetch("https://include-type.herokuapp.com/api/user/logout", {
            method: "POST",
            credentials: "include"
        });
        // console.log(`${props.user.firstName} logged out successfully.`);
        props.setUser({
            userId: "",
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: ""
        });
        props.setLoginComplete(false);
    }

    return (
        <div className="login_page dashboard">
            <h1>Welcome {props.user.firstName} {props.user.lastName}! 😃</h1>
            <p>Username : {props.user.username}</p>
            <p>Email    : {props.user.email}</p>
            <button className="registration_buttons" onClick={logout}>Log Out</button>
        </div>
    );
}

export default Dashboard;