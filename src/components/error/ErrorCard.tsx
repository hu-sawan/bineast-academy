import "./ErrorCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function ErrorCard({ message }: { message: string }) {
    return (
        <div className="error">
            <div className="error__wrapper">
                <div className="icon">
                    <FontAwesomeIcon icon={faXmark} shake />
                </div>
                {message}
            </div>
        </div>
    );
}

export default ErrorCard;
