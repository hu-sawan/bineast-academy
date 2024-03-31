import { Link } from "react-router-dom";
import "./StatBox.scss";

interface StatBoxProps {
    to: string;
    value: string;
    subtitle: string;
    icon: JSX.Element;
}

function StatBox({ to, value, subtitle, icon }: StatBoxProps) {
    return (
        <Link
            style={{
                width: "100%",
                margin: "0px 30px",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
            }}
            to={`/${to}`}
        >
            <div className="stat-box">
                <div className="stat-box__header">
                    {icon}
                    <h4 style={{ color: "var(--primary-text-color)" }}>
                        {value}
                    </h4>
                </div>
                <div className="stat-box__details">
                    <h5>{subtitle}</h5>
                </div>
            </div>
        </Link>
    );
}

export default StatBox;
