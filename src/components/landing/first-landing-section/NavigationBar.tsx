import React from "react";
import { Link } from "react-scroll";
import "../css/first-landing-section-css/Navbar.css";

export default function NavigationBar() {
  return (
    <>
      <Link
        activeClass="active"
        className="navbar_link"
        to="first_landing_section"
        spy={true}
        smooth={true}
        duration={1000}
      >
        Home
      </Link>
      <Link
        activeClass="active"
        className="navbar_link"
        to="Features"
        spy={true}
        smooth={true}
        duration={1000}
      >
        Features
      </Link>
      <Link
        activeClass="active"
        className="navbar_link"
        to="Services"
        spy={true}
        smooth={true}
        duration={1000}
      >
        Services
      </Link>
      {/* <Link className="navbar_link" to="/">
        Statistics
      </Link> */}
      <Link
        activeClass="active"
        className="navbar_link"
        to="Our_team"
        spy={true}
        smooth={true}
        duration={1000}
      >
        Our Team
      </Link>
      <Link
        activeClass="active"
        className="navbar_link"
        to="Footer"
        spy={true}
        smooth={true}
        duration={1000}
      >
        Footer
      </Link>
    </>
  );
}
