import "./ErrorCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface ErrorCardProps {
    message: string;
    fill?: boolean;
    onTop?: boolean;
}

function ErrorCard({ message, fill = false, onTop = false }: ErrorCardProps) {
    return (
        <div className={`error-card ${fill && "fill"} ${onTop && "on-top"}`}>
            <div className="error-card__wrapper">
                <div className="icon">
                    <FontAwesomeIcon icon={faXmark} shake />
                </div>
                {message}
            </div>
        </div>
    );
}

export default ErrorCard;
