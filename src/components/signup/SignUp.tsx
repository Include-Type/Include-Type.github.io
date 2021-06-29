import React from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SignUp.css";
import Banner from "../login/banner/Banner";

export default function SignUp() {
  return (
    <div className="signUp_page">
      <Banner />
      <div className="signUp_container d-flex align-items-center justify-content-center">
        <Form className="signUp_form" id="form_body">
          <div className="signUp_header">Create your account</div>
          <hr className="mb-4" />
          {/* <!-- name --> */}
          <div className="row align-items-center mb-1">
            <div className="col">
              <label className="signUp_form_labels mb-3">People call me:</label>
            </div>
            <div className="col">
              <input
                id="first_name"
                className="form-control"
                type="text"
                placeholder="Srijita"
                name="FIRST"
                required
              />
              <label htmlFor="first_name" className="text-muted">
                First Name
              </label>
            </div>
            <div className="col">
              <input
                id="last_name"
                className="form-control"
                type="text"
                placeholder="Chakrabarty"
                name="FIRST"
                required
              />
              <label htmlFor="last_name" className="text-muted">
                Last Name
              </label>
            </div>
          </div>

          {/* <!-- username --> */}
          <div className="row align-items-center mb-1">
            <div className="col-4">
              <label htmlFor="username" className="signUp_form_labels">
                My username will be:
              </label>
            </div>
            <div className="col-8">
              <input
                id="username"
                className="form-control"
                type="text"
                placeholder="Username"
                name="USERNAME"
                required
              ></input>
            </div>
          </div>

          {/* <!-- email --> */}
          <div className="row align-items-center mb-1">
            <div className="col-4">
              <label htmlFor="email" className="signUp_form_labels">
                Drop a mail at:
              </label>
            </div>
            <div className="col-8">
              <input
                type="email"
                name="EMAIL"
                id="email"
                className="form-control"
                placeholder="yourname@example.com"
                required
              ></input>
            </div>
          </div>

          {/* <!-- password --> */}
          <div className="row align-items-center mb-1">
            <div className="col-4">
              <label htmlFor="password" className="signUp_form_labels">
                Password:
              </label>
            </div>
            <div className="col-8">
              <input
                type="password"
                id="password"
                className="form-control"
                name="PASS"
                placeholder="enter your password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
              ></input>
            </div>
          </div>

          <div className="row align-items-center mb-1">
            <div className="col-4">
              <label htmlFor="confirm_password" className="signUp_form_labels">
                Confirm Password:
              </label>
            </div>
            <div className="col-8">
              <input
                type="password"
                id="confirm_password"
                className="form-control"
                name="CONFIRM PASS"
                placeholder="confirm your password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
              ></input>
            </div>
          </div>

          <hr className="my-4" />

          <div>
            <input type="checkbox" name="" id="agree_checkbox" required></input>
            <label htmlFor="agree_checkbox" className="signUp_form_labels ml-2">
              I agree to the terms and conditions
            </label>
            <div id="terms" className="signUp_form_labels font-weight-bold">
              T&C
            </div>
          </div>
          <div className="logged_in">
            <span className="signUp_form_labels">Already have an account?</span>
            <Link
              to="/LoginPage"
              className="login_option signUp_form_labels ml-4 font-weight-bold"
            >
              Go to your account
            </Link>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button className="submit_button" type="submit">
              Create Account
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
