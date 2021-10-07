import { ReactElement } from "react";
import "./DevCheck.css";

interface DevCheckProps {
    password: string,
    userInput: string,
    setUserInput: Function
};

function DevCheck(props: DevCheckProps): ReactElement {
    return (
        <div className="Dev">
            <header className="Dev-header">
                <p>This application is under development!</p>
                <p>
                    If you're a member of the development team, then please
                    enter the password to proceed...
                </p>
                <br />
                <input
                    autoFocus
                    type="password"
                    className="Dev-input"
                    placeholder="Password"
                    value={props.userInput}
                    onInput={e => props.setUserInput(e.currentTarget.value)}
                />
                {props.userInput === "" ? (
                    <p></p>
                ) : (
                    props.userInput !== props.password ? (
                        <p className="Input-info-red">❌ Incorrect Password!</p>
                    ) : (
                        <p></p>
                    )
                )}
            </header>
        </div>
    );
}

export default DevCheck;