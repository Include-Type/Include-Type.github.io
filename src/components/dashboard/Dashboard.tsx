import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { PrivacyProfile } from "../../models/PrivacyProfile";
import { ProfessionalProfile } from "../../models/ProfessionalProfile";
import { User } from "../../models/User";
import "./Dashboard.css";
interface DashboardProps {
    personalProfile: User,
    setPersonalProfile: React.Dispatch<React.SetStateAction<User>>,
    professionalProfile: ProfessionalProfile,
    setProfessionalProfile: React.Dispatch<React.SetStateAction<ProfessionalProfile>>,
    privacy: PrivacyProfile,
    setPrivacy: React.Dispatch<React.SetStateAction<PrivacyProfile>>
    setLoginComplete: React.Dispatch<React.SetStateAction<boolean>>
};

function Dashboard(props: DashboardProps): ReactElement {
    var navigate = useNavigate();

    async function logout(): Promise<void> {
        await fetch("https://include-type.herokuapp.com/api/user/logout", {
            method: "POST",
            credentials: "include"
        });
        // console.log(`${props.user.firstName} logged out successfully.`);
        props.setPersonalProfile({
            id: "",
            firstName: "",
            lastName: "",
            bio: "",
            username: "",
            email: "",
            password: "",
            address: "",
            country: "",
            city: "",
            state: "",
            pincode: "",
            contact: "",
            picture: "",
            isAdmin: false
        });
        props.setLoginComplete(false);
    }

    return (
        <div className="dashboard">
            <h1>Welcome {props.personalProfile!.firstName} {props.personalProfile!.lastName}! 😃</h1>
            <p>Username : {props.personalProfile!.username}</p>
            <p>Email    : {props.personalProfile!.email}</p>
            <button className="registration_buttons" onClick={() => logout()}>Log Out</button>
            <button className="registration_buttons" onClick={() => navigate("/profile/personal")}>Profile</button>
            <button className="registration_buttons" onClick={() => navigate("/project-tasks")}>Task List</button>
            <button className="registration_buttons" onClick={() => navigate("/project-issues")}>Issue List</button>
            <button className="registration_buttons" onClick={() => navigate("/projects")}>Project List</button>
        </div>
    );
}

export default Dashboard;