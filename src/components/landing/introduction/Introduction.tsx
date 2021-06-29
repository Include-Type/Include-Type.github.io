import React from "react";

import Header from "../first-landing-section/Header";
import BrandName from "../first-landing-section/BrandName";
import LandingBox from "../first-landing-section/LandingBox";
import LandingImage from "../first-landing-section/LandingImage";
import NavigationBar from "../first-landing-section/NavigationBar";

import AllFeatures from "../features/AllFeatures";
import AllServices from "../services/AllServices";
import AllMembers from "../our-team/AllMembers";
import Footer from "../footer/Footer";

import "../css/first-landing-section-css/Introduction.css";

export default function Introduction() {
    return (
        <div id="landing_page_sections">
            <section id="first_landing_section">
                <div className="header d-flex align-items-center justify-content-end">
                    <Header />
                </div>
                <div className="landing_body_introduction">
                    <div className="row">
                        <div className="col-7">
                            <BrandName />
                            <LandingBox />
                        </div>
                        <div className="col">
                            <LandingImage />
                        </div>
                    </div>
                </div>
                <div className="navigation_bar d-flex align-items-center justify-content-around">
                    <NavigationBar />
                </div>
            </section>

            <section id="Features">
                <div className="section_headers features_header">FEATURES</div>
                <AllFeatures />
            </section>

            <section id="Services">
                <div className="section_headers services_header">SERVICES</div>
                <AllServices />
            </section>

            <section id="Our_team">
                <div className="section_headers team_header">OUR TEAM</div>
                <AllMembers />
            </section>

            <section id="Demo_app" className="d-flex align-items-center justify-content-around py-lg-5">
                <button className="demo_app_button">Try Our Application &rarr;</button>
            </section>

            <section id="Footer">
                <Footer />
            </section>
        </div>
    );
}
