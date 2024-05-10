import React, { useState } from "react";
import Banner from "../banner/Banner";
import "../Login.css";
import { CircularProgress } from "@mui/material";
import { UserVerificationRequestDto } from "../../../dtos/UserVerificationRequestDto";

export default function ForgotPassword() {
  const [requestState, setRequestState] = useState<string>("");
  const [requestDto, setRequestDto] = useState<UserVerificationRequestDto>({
    email: ""
  });

  async function submitForm(e: React.FormEvent): Promise<void> {
    setRequestState("initiated");
    e.preventDefault();
    try {
      const response = await fetch(`https://backend-api-pms.onrender.com/api/user/requestpasswordreset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(requestDto)
      });
      if (response.ok) {
        setRequestState("success");
      } else {
        throw new Error();
      }
    } catch (error) {
      setRequestState("failed");
    }
  }

  if (requestState === "success") {
    return (
      <div className="login_page">
        <Banner />
        <div className="login_container d-flex align-items-center justify-content-center">
          <form className="login_form" onSubmit={submitForm}>
            <div className="mb-3 login_header">Reset Password</div>
            <hr className="mb-4" />
            <div className="mb-4">
              <div id="emailHelp" className="form-text text-muted">
                <p style={{ fontSize: "1.6em", textAlign: "center" }}>
                  An email containing the password reset link has been sent to <br></br> <b>{requestDto.email}</b>. ✅ Please check your inbox.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="login_page">
      <Banner />
      <div className="login_container d-flex align-items-center justify-content-center">
        <form className="login_form" onSubmit={submitForm}>
          <div className="mb-3 login_header">Forgot Password</div>
          <hr className="mb-4" />
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label pb-1">
              Email address
            </label>
            <input
              required
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={requestDto.email}
              onInput={(e) => setRequestDto({ ...requestDto, email: e.currentTarget.value })}
            />
            <div id="emailHelp" className="form-text text-muted">
              <p style={{ fontSize: "1.2em", textAlign: "left" }}>
                Enter the email address you used to login and we'll <br></br> send an email containing a password reset link.
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button
              disabled={requestState === "initiated" ? true : false}
              type="submit"
              className="submit_button_login"
            //style={{ height: "4.2vh", width: "6vw" }}
            >
              {requestState === "initiated" ? (
                <CircularProgress size={19} style={{ color: "black", marginTop: "8px" }} />
              ) : (
                "Send Email"
              )}
            </button>
          </div>
          <div className="login_message">
            {requestState === "user not found" ? (
              <p style={{ marginTop: 18, marginBottom: -26 }}>Email not found in our app's database! ❌</p>
            ) : requestState === "failed" ? (
              <p style={{ marginTop: 18, marginBottom: -26 }}>Something went wrong! Please try again ❌</p>
            ) : (
              <p></p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
