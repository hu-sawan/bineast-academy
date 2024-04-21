import "./Loading.scss";

interface LoadingProps {
    onTop?: boolean;
    fill?: boolean;
    backgroundColor?: string;
    particlesBackgroundColor?: string;
    position?: "relative" | "absolute";
    size?: "small" | "medium" | "large";
    message?: string;
    minHeight?: boolean;
    borderRadius?: string;
}

function Loading({
    onTop = false,
    fill = false,
    backgroundColor = "",
    particlesBackgroundColor = "",
    position = "absolute",
    size = "large",
    message = "",
    minHeight = true,
    borderRadius = "0",
}: LoadingProps) {
    return (
        <div
            className={`loading ${position} ${size} ${fill ? "fill" : null} ${
                onTop && "on-top"
            } ${minHeight ? "min-height" : null}`}
            style={{ backgroundColor: `${backgroundColor}`, borderRadius }}
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
            {message && <p className="loading__message">{message}</p>}
        </div>
    );
}

export default Loading;
