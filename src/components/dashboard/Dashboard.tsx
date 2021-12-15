import React, { ReactElement, useState } from "react";
import { PrivacyProfile } from "../../models/PrivacyProfile";
import { ProfessionalProfile } from "../../models/ProfessionalProfile";
import { User } from "../../models/User";
import Application from "../application/Application";
import Issuelist from "../application/Issuelist/Issuelist";
import Tasklist from "../application/Tasklist/Tasklist";
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
    const [flag, setFlag] = useState<number>(0);
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
            picture: ""
        });
        props.setLoginComplete(false);
    }

    return (
        <div>
            {flag === 0 ? (
                <div className="login_page dashboard">
                    <h1>Welcome {props.personalProfile!.firstName} {props.personalProfile!.lastName}! 😃</h1>
                    <p>Username : {props.personalProfile!.username}</p>
                    <p>Email    : {props.personalProfile!.email}</p>
                    <button className="registration_buttons" onClick={logout}>Log Out</button>
                    <button className="registration_buttons" onClick={() => setFlag(1)}>Profile</button>
                    <button className="registration_buttons" onClick={() => setFlag(2)}>Task List</button>
                    <button className="registration_buttons" onClick={() => setFlag(3)}>Issue List</button>
                </div>
            ) : (
                flag === 1 ? (
                    <Application
                        personalProfile={props.personalProfile}
                        setPersonalProfile={props.setPersonalProfile}
                        professionalProfile={props.professionalProfile}
                        setProfessionalProfile={props.setProfessionalProfile}
                        privacy={props.privacy}
                        setPrivacy={props.setPrivacy}
                    />
                ) : (
                    flag === 2?(
                        <Tasklist
                            user={props.personalProfile}
                            />
                            ):(
                        <Issuelist 
                            user={props.personalProfile}
                        
                        />
                    )
                )
            ) }
        </div>
    );
}

export default Dashboard;