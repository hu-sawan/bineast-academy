import "./Video.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../loading/Loading";

interface videoType {
    orderNb: number;
    courseId: string;
    title: string;
    description: string;
    videoUrl: string;
    durationInMinutes: number;
}

function Video() {
    const { courseId, orderNb } = useParams();
    const [video, setVideo] = useState<videoType | null>(null);

    useEffect(() => {
        const getVideo = async () => {
            const response = await fetch(
                `http://localhost:5050/api/courses/${courseId}/${orderNb}`
            );
            const data = await response.json();
            setVideo(data[0]);
        };

        getVideo();
    }, [courseId, orderNb]);

    if (!video) return <Loading />;

    return (
        <div className="video">
            <h2>{video.title}</h2>
            <video controls>
                <source src={video.videoUrl} type="video/mp4" />
            </video>
            <div className="video__description">{video.description}</div>
        </div>
    );
}

export default Video;
