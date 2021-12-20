import React from "react";
import "../css/first-landing-section-css/Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <Link to="/login" className="registration_buttons" role="button">
        Login
      </Link>
      <Link to="/signup" className="registration_buttons" role="button">
        Sign Up
      </Link>
    </>
  );
}
