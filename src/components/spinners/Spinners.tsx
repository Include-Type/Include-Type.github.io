import { ReactElement } from "react";
import "./Spinners.css";

function LoadingSpinnerLarge(): ReactElement {
    return (
        <div className="login_page spinner-div-large">
            <div className="spinner-border spinner-large" role="status">
            </div>
        </div>
    );
}

function LoadingSpinnerMedium(): ReactElement {
    return (
        <div className="spinner-div-medium">
            <div className="spinner-border spinner-medium" role="status">
            </div>
        </div>
    );
}

function LoadingSpinnerSmall(): ReactElement {
    return (
        <div className="spinner-div-small">
            <div className="spinner-border spinner-border-sm spinner-small" role="status">
            </div>
        </div>
    );
}

export {
    LoadingSpinnerLarge,
    LoadingSpinnerMedium,
    LoadingSpinnerSmall
}