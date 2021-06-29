import React from "react";
import "../css/first-landing-section-css/Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <Link to="/LoginPage" className="registration_buttons" role="button">
        Login
      </Link>
      <Link to="/SignUpPage" className="registration_buttons" role="button">
        Sign Up
      </Link>
    </>
  );
}
