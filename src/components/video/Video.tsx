import "./Video.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Loading from "../loading/Loading";
import ErrorCard from "../error/ErrorCard";
import { instructor, videoDetails } from "../../types/types";
import { useCourse } from "../../contexts/CourseContext";

function Video() {
    const { courseId, orderNb } = useParams();
    const { videos, instructors, requestVideos } = useCourse();
    const [video, setVideo] = useState<videoDetails | null>(null);
    const [isNextDisabled, setIsNextDisabled] = useState<boolean>(
        orderNb === `${videos.length}` ? true : false
    );
    const [isPrevDisabled, setIsPrevDisabled] = useState<boolean>(
        orderNb === "1" ? true : false
    );

    const [done, setDone] = useState<boolean>(video?.isDone ?? false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        const getVideo = async () => {
            try {
                setError("");
                setVideo(null);
                const response = await fetch(
                    `http://localhost:5050/api/videos/details/${courseId}/${orderNb}/U001`
                );

                const data = await response.json();

                if (response.status !== 200) throw Error(data.message);

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

    useEffect(() => {
        setDone(video?.isDone ?? false);
    }, [video]);

    const handleDoneClick = async () => {
        setLoading(true);
        // if already done then delete the done status
        if (done) {
            const response = await fetch(
                `http://localhost:5050/api/videos/finished`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        courseId,
                        orderNb,
                        userId: "U001",
                    }),
                }
            );

            const data = await response.json();

            if (response.status !== 200) {
                setError(data.message);
                setLoading(false);
                return;
            }

            requestVideos();

            setDone(false);
        }
        // if not done then set the done status
        else {
            const response = await fetch(
                `http://localhost:5050/api/videos/finished`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        courseId,
                        orderNb,
                        userId: "U001",
                    }),
                }
            );

            const data = await response.json();

            if (response.status !== 200) {
                setError(data.message);
                setLoading(false);
                return;
            }

            requestVideos();

            setDone(true);
        }
        setLoading(false);
    };

    const handlePrevClick = () => {
        const prevOrderNb = parseInt(orderNb ?? "0") - 1;

        if (prevOrderNb + 1 === 1) {
            setIsPrevDisabled(true);
        } else {
            if (isNextDisabled) setIsNextDisabled(false);
            navigate(`/course/${courseId}/${prevOrderNb}`);
        }
    };

    const handleNextClick = () => {
        const nextOrderNb = parseInt(orderNb ?? "0") + 1;

        if (nextOrderNb - 1 === videos.length) {
            setIsNextDisabled(true);
        } else {
            if (isPrevDisabled) setIsPrevDisabled(false);
            navigate(`/course/${courseId}/${nextOrderNb}`);
        }
    };

    if (error)
        return (
            <div className="video">
                <ErrorCard message={error} />
            </div>
        );

    return (
        <div className={`video ${video?.isDone ? "done" : null}`}>
            {!video ? (
                <Loading />
            ) : (
                <>
                    <div className="video__heading">
                        <h2>{video.title}</h2>
                        {!!done && (
                            <FontAwesomeIcon
                                className="video__heading__check"
                                icon={faCircleCheck}
                            ></FontAwesomeIcon>
                        )}
                    </div>
                    <video controls>
                        {/* <source src={video.videoUrl} type="video/mp4" /> */}
                    </video>
                    <div className="video__instructor">
                        Instructor(s):{" "}
                        {instructors.map(
                            ({ instructorFullName }: instructor, idx) => {
                                return (
                                    instructorFullName +
                                    (idx === instructors.length - 1 ? "" : ", ")
                                );
                            }
                        )}
                    </div>
                    <div className="video__description">
                        {video.description}
                    </div>
                    <div className="video__nav">
                        <button
                            className="done-btn"
                            onClick={handleDoneClick}
                            disabled={loading}
                        >
                            Done
                        </button>
                        <button
                            className="prev-btn"
                            onClick={handlePrevClick}
                            disabled={isPrevDisabled}
                        >
                            Prev
                        </button>
                        <button
                            className="next-btn"
                            onClick={handleNextClick}
                            disabled={isNextDisabled}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Video;
