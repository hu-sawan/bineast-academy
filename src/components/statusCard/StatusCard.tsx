import "./StatusCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface StatusCardProps {
    message: string;
    title: string;
    color: string;
    icon: any;
}

function StatusCard({ message, title, color, icon }: StatusCardProps) {
    return (
        <div className="success-card">
            <div className="success-card__card">
                <FontAwesomeIcon
                    className="icon"
                    icon={icon}
                    style={{
                        color: color,
                    }}
                />
                <h1
                    style={{
                        color: color,
                    }}
                >
                    {title}
                </h1>
                <p>{message}</p>
                <div>
                    Return to <Link to="/">Home</Link>
                </div>
            </div>
        </div>
    );
}

export default StatusCard;
