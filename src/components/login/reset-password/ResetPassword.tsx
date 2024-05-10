import React, { useState } from "react";
import Banner from "../banner/Banner";
import "../Login.css";
import { CircularProgress } from "@mui/material";
import { UserVerificationDto } from "../../../dtos/UserVerificationDto";
import { useParams } from "react-router-dom";

type ResetPasswordParams = {
    userId: string,
    uniqueString: string
};

export default function ResetPassword() {
    const params = useParams<ResetPasswordParams>();
    const [requestState, setRequestState] = useState<string>("");
    const [reTypedPass, setReTypedPass] = useState<string>("");
    const [verificationDto, setVerificationDto] = useState<UserVerificationDto>({
        userId: params.userId as string,
        uniqueString: params.uniqueString as string,
        newPassword: ""
    });

    async function submitForm(e: React.FormEvent): Promise<void> {
        setRequestState("initiated");
        e.preventDefault();
        try {
            const response = await fetch(`https://backend-api-pms.onrender.com/api/user/authorizepasswordreset`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(verificationDto)
            });
            const jsonText: string = await response.text();
            setRequestState(jsonText.toLowerCase());
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
                                    Your account's password has been successfully updated. ✅
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    if (requestState === "expired") {
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
                                    This link has unfortunately expired. ❌ <br></br> Please try again using a new link.
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    if (requestState === "failed") {
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
                                    Something went wrong. ❌ <br></br> Please try again using a new link.
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
                    <div className="mb-3 login_header">Reset Password</div>
                    <hr className="mb-4" />
                    <div className="mb-4">
                        <label htmlFor="exampleInputEmail1" className="form-label pb-1">
                            New Password
                        </label>
                        <input
                            required
                            type="password"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={verificationDto.newPassword}
                            onInput={(e) => setVerificationDto({ ...verificationDto, newPassword: e.currentTarget.value })}
                        />
                        {/* <div id="emailHelp" className="form-text text-muted">
                            <p style={{ fontSize: "1.2em", textAlign: "left" }}>
                                Enter the email address you used to login and we'll <br></br> send an email containing a password reset link.
                            </p>
                        </div> */}
                    </div>
                    <div className="mb-4 pb-2">
                        <label htmlFor="exampleInputPassword1" className="form-label pb-1">
                            Retype New Password
                        </label>
                        <input
                            required
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            value={reTypedPass}
                            onInput={(e) => setReTypedPass(e.currentTarget.value)}
                        />
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
                                "Reset Password"
                            )}
                        </button>
                    </div>
                    <div className="login_message">
                        {reTypedPass !== "" &&
                            reTypedPass !== verificationDto.newPassword ? (
                            <p style={{ marginTop: 18, marginBottom: -26 }}>Passwords don't match! ❌</p>
                        ) : (
                            <p></p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
