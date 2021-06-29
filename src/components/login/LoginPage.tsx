import React from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import Banner from "./banner/Banner";
import "./Login.css";

export default function LoginPage() {
  return (
    <div className="login_page">
      <Banner />
      <div className="login_container d-flex align-items-center justify-content-center">
        <Form className="login_form">
          <div className="mb-3 login_header">Welcome</div>
          <hr className="mb-4" />
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-4 pb-2">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-2 pb-4 d-flex align-items-center justify-content-between font-weight-bold">
            <div>Not Registered yet?</div>
            <Link to="/SignUpPage" className="create_account">
              Create an Account
            </Link>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button type="submit" className="submit_button">
              Login
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
