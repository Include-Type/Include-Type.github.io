import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { PrivacyProfile } from "../../models/PrivacyProfile";
import { ProfessionalProfile } from "../../models/ProfessionalProfile";
import { User } from "../../models/User";
import Dashboard from "../dashboard/Dashboard";
import UserDashboard from "../Userdashboard/UserDashboard";
// import "./Application.css";
import "./Application_2.css";
import Issuelist from "./Issuelist/Issuelist";
import PersonalProfile from "./Profile/personal-profile/PersonalProfile";
import AllPrivacySettings from "./Profile/privacy-settings/AllPrivacySettings";
import ProProfilePassword from "./Profile/pro-profile-password/ProProfilePassword";
import Projectlist from "./Projectlist/Projectlist";
import Tasklist from "./Tasklist/Tasklist";
import Sidebar from "../sidebar/Sidebar";
import AdminPage from "./Admin/AdminPage";
import NewUpdateProject from "./Admin/NewUpdateProject";
import BrandName2 from "../landing/first-landing-section/BrandName2";
import ProjectDetails from "./Projectlist/ProjectDetails/ProjectDetails";

interface ApplicationProps {
  personalProfile: User;
  setPersonalProfile: React.Dispatch<React.SetStateAction<User>>;
  professionalProfile: ProfessionalProfile;
  setProfessionalProfile: React.Dispatch<
    React.SetStateAction<ProfessionalProfile>
  >;
  privacy: PrivacyProfile;
  setPrivacy: React.Dispatch<React.SetStateAction<PrivacyProfile>>;
  setLoginComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

// export default function Application(props: ApplicationProps) {
//   return (
//     <section id="Application_page">
//       <section id="Status"></section>
//       <section id="Main_area">
//         <section id="Application_menu_area"></section>
//         <section id="Application_content_area">
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <Dashboard
//                   personalProfile={props.personalProfile}
//                   setPersonalProfile={props.setPersonalProfile}
//                   professionalProfile={props.professionalProfile}
//                   setProfessionalProfile={props.setProfessionalProfile}
//                   privacy={props.privacy}
//                   setPrivacy={props.setPrivacy}
//                   setLoginComplete={props.setLoginComplete}
//                 />
//               }
//             />
//             <Route path="/profile">
//               <Route
//                 path="personal"
//                 element={
//                   <PersonalProfile
//                     personalProfile={props.personalProfile}
//                     setPersonalProfile={props.setPersonalProfile}
//                   />
//                 }
//               />
//               <Route
//                 path="pro-pass"
//                 element={
//                   <ProProfilePassword
//                     personalProfile={props.personalProfile}
//                     setPersonalProfile={props.setPersonalProfile}
//                     professionalProfile={props.professionalProfile}
//                     setProfessionalProfile={props.setProfessionalProfile}
//                   />
//                 }
//               />
//               <Route
//                 path="privacy"
//                 element={
//                   <AllPrivacySettings
//                     privacy={props.privacy}
//                     setPrivacy={props.setPrivacy}
//                   />
//                 }
//               />
//             </Route>
//             <Route
//               path="/project-tasks"
//               element={
//                 <Tasklist
//                   user={props.personalProfile}
//                 />
//               }
//             />
//             <Route
//               path="/project-issues"
//               element={
//                 <Issuelist
//                   user={props.personalProfile}
//                 />
//               }
//             />
//             <Route
//               path="/projects"
//               element={
//                 <Projectlist
//                   user={props.personalProfile}
//                 />
//               }
//             />
//           </Routes>
//         </section>
//       </section>
//     </section>
//   );
// }

export default function Application(props: ApplicationProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <section id="Application_page">
      <section id="Status">
        <div className="status_container">
          <div
            className={
              isExpanded === true
                ? "brand_container_3 py-4 px-4"
                : "brand_container_2 py-4 px-4"
            }
          >
            <BrandName2 />
          </div>
          {/* {isExpanded === true ? <BrandName3 /> : <BrandName2 />} */}
        </div>
      </section>
      <section id="Main_area">
        <section id="Application_menu_area">
          <Sidebar
            user={props.personalProfile}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          />
        </section>
        <section id="Application_content_area">
          <Routes>
            <Route
              path="/admin"
              element={
                <AdminPage
                  user={props.personalProfile}
                />
              }
            />
            <Route
              path="/admin/projects/:projName"
              element={
                <NewUpdateProject
                  user={props.personalProfile}
                />
              }
            />
            <Route
              path="/"
              element={
                <Dashboard
                  personalProfile={props.personalProfile}
                  setPersonalProfile={props.setPersonalProfile}
                  professionalProfile={props.professionalProfile}
                  setProfessionalProfile={props.setProfessionalProfile}
                  privacy={props.privacy}
                  setPrivacy={props.setPrivacy}
                  setLoginComplete={props.setLoginComplete}
                />
              }
            />
            <Route path="/user_dashboard" element={<UserDashboard />} />
            <Route
              path="/project_list"
              element={<Projectlist user={props.personalProfile} />}
            />
            <Route
              path="/projects/:projName"
              element={<ProjectDetails user={props.personalProfile} />}
            />
            <Route
              path="/task_list"
              element={<Tasklist user={props.personalProfile} />}
            />
            <Route
              path="/issue_list"
              element={<Issuelist user={props.personalProfile} />}
            />
            <Route
              path="/profile/personal"
              element={
                <PersonalProfile
                  personalProfile={props.personalProfile}
                  setPersonalProfile={props.setPersonalProfile}
                />
              }
            />
            <Route
              path="/profile/pro-pass"
              element={
                <ProProfilePassword
                  personalProfile={props.personalProfile}
                  setPersonalProfile={props.setPersonalProfile}
                  professionalProfile={props.professionalProfile}
                  setProfessionalProfile={props.setProfessionalProfile}
                />
              }
            />
            <Route
              path="/profile/privacy"
              element={
                <AllPrivacySettings
                  privacy={props.privacy}
                  setPrivacy={props.setPrivacy}
                />
              }
            />
          </Routes>
        </section>
      </section>
    </section>
  );
}
