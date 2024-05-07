import "./AccessDenied.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface AccessDeniedProps {
    to?: string;
}

function AccessDenied({ to = "/" }: AccessDeniedProps) {
    return (
        <div className="access-denied">
            <div className="access-denied__card">
                <FontAwesomeIcon className="icon" icon={faXmark} />
                <h1>Access Denied</h1>
                <p style={{ marginBottom: "10px" }}>
                    You do not have permission to view this page
                </p>
                <p>Please check your credentails and try again</p>
                <Link className="is-easy hover" to={to}>
                    Back to Home
                </Link>
            </div>
        </div>
    );
}

export default AccessDenied;
