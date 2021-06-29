import React from "react";
import { Link } from "react-router-dom";
import "./Banner.css";

export default function Banner() {
  return (
    <div className="banner d-flex align-items-center justify-content-end">
      <Link to="/" className="registration_buttons" role="button">
        Home
      </Link>
    </div>
  );
}
