import "./Video.scss";
import { useParams } from "react-router-dom";

function Video() {
    const { vidId } = useParams();

    return <div className="video">vid {vidId}</div>;
}

export default Video;
