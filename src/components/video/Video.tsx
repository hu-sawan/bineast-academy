import "./Video.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import ErrorCard from "../error/ErrorCard";

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
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const getVideo = async () => {
            try {
                setError("");
                setVideo(null);
                const response = await fetch(
                    `http://localhost:5050/api/courses/video/${courseId}/${orderNb}`
                );
                const data = await response.json();

                if (data.length === 0) {
                    throw Error("Video not found");
                }

                setVideo(data[0]);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Error fetching data from server");
                }
            }
        };

        getVideo();
    }, [courseId, orderNb]);

    if (error)
        return (
            <div className="video">
                <ErrorCard message={error} />
            </div>
        );

    return (
        <div className="video">
            {!video ? (
                <Loading />
            ) : (
                <>
                    <h2>{video.title}</h2>
                    <video controls>
                        <source src={video.videoUrl} type="video/mp4" />
                    </video>
                    {/* TODO: get intructor details from api/instructor/courseId and diplay it here */}
                    <div className="video__instructor"></div>
                    <div className="video__description">
                        {video.description}
                    </div>
                    {/* TODO: khallesa bel jem3a */}
                    <div className="video__nav">
                        <span>Done</span>
                        <span>Prev</span>
                        <span>Next</span>
                    </div>
                </>
            )}
        </div>
    );
}

export default Video;
