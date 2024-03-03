import "./Loading.scss";

interface LoadingProps {
    position?: "relative" | "absolute";
    size?: "small" | "medium" | "large";
}

function Loading({ position = "absolute", size = "large" }: LoadingProps) {
    return (
        <div className={`loading ${position} ${size}`}>
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
