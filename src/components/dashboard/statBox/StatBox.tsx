import "./StatBox.scss";

interface StatBoxProps {
    value: string;
    subtitle: string;
    icon: JSX.Element;
}

function StatBox({ value, subtitle, icon }: StatBoxProps) {
    return (
        <div className="stat-box">
            <div className="stat-box__header">
                {icon}
                <h4 style={{ color: "var(--primary-text-color)" }}>{value}</h4>
            </div>
            <div className="stat-box__details">
                <h5>{subtitle}</h5>
            </div>
        </div>
    );
}

export default StatBox;
