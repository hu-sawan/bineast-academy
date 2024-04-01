import "./Loading.scss";

interface LoadingProps {
    onTop?: boolean;
    fill?: boolean;
    backgroundColor?: string;
    particlesBackgroundColor?: string;
    position?: "relative" | "absolute";
    size?: "small" | "medium" | "large";
}

function Loading({
    onTop = false,
    fill = false,
    backgroundColor = "",
    particlesBackgroundColor = "",
    position = "absolute",
    size = "large",
}: LoadingProps) {
    return (
        <div
            className={`loading ${position} ${size} ${fill && "fill"} ${
                onTop && "on-top"
            }`}
            style={{ backgroundColor: `${backgroundColor}` }}
        >
            <div className="loading__animation">
                <div
                    style={{ backgroundColor: particlesBackgroundColor }}
                ></div>
                <div
                    style={{ backgroundColor: particlesBackgroundColor }}
                ></div>
                <div
                    style={{ backgroundColor: particlesBackgroundColor }}
                ></div>
                <div
                    style={{ backgroundColor: particlesBackgroundColor }}
                ></div>
            </div>
        </div>
    );
}

export default Loading;
