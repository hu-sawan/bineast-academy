import "./Loading.scss";

interface LoadingProps {
    onTop?: boolean;
    fill?: boolean;
    position?: "relative" | "absolute";
    size?: "small" | "medium" | "large";
}

function Loading({
    onTop = false,
    fill = false,
    position = "absolute",
    size = "large",
}: LoadingProps) {
    return (
        <div
            className={`loading ${position} ${size} ${fill && "fill"} ${
                onTop && "on-top"
            }`}
        >
            <div className="loading__animation">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Loading;
