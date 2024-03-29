interface HeaderProps {
    title: string;
    subtitle: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
    return (
        <div
            style={{
                marginBottom: "15px",
            }}
        >
            <h2
                style={{
                    color: "var(--primary-text-color)",
                    fontSize: "32px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                }}
            >
                {title}
            </h2>
            <h5
                style={{
                    color: "var(--light-green-text-color)",
                    fontWeight: "400",
                    fontSize: "16px",
                }}
            >
                {subtitle}
            </h5>
        </div>
    );
};

export default Header;
