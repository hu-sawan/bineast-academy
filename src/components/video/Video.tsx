import "./Video.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Loading from "../loading/Loading";
import ErrorCard from "../error/ErrorCard";
import {
    CourseContextInterface,
    Instructor,
    VideoDetails,
} from "../../types/types";
import { useCourse } from "../../contexts/CourseContext";
import { useAuth } from "../../contexts/AuthContext";
import { useAccessToken } from "../../contexts/AccessTokenContext";

function Video() {
    const { courseId, videoId } = useParams();

    const {
        course,
        videos,
        instructors,
        activeVideoIdx,
        setActiveVideoIdx,
        setVideos,
        setCourse,
    } = useCourse();

    const [video, setVideo] = useState<VideoDetails | null>(null);
    const [isNextDisabled, setIsNextDisabled] = useState<boolean>(
        activeVideoIdx === videos.length - 1 ? true : false
    );
    const [isPrevDisabled, setIsPrevDisabled] = useState<boolean>(
        activeVideoIdx === 0 ? true : false
    );

    const [done, setDone] = useState<boolean>(video?.isDone ?? false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const { user } = useAuth();

    const accessToken = useAccessToken();

    useEffect(() => {
        const getVideo = async () => {
            try {
                setError("");
                setVideo(null);
                const response = await fetch(
                    process.env.REACT_APP_API_URL +
                        `/api/videos/details/${courseId}/${videoId}/${user?.uid}`,
                    {
                        method: "GET",
                        headers: {
                            "content-type": "application/json",
                            "x-access-token": accessToken,
                        },
                    }
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseId, videoId, user]);

    // A simple useEffect to decide if the prev, next buttons are disabled
    useEffect(() => {
        if (activeVideoIdx === 0) {
            setIsPrevDisabled(true);
        } else {
            setIsPrevDisabled(false);
        }

        if (activeVideoIdx === videos.length - 1) {
            setIsNextDisabled(true);
        } else {
            setIsNextDisabled(false);
        }
    }, [activeVideoIdx, videos.length]);

    // This useEffect synchronizes the data retrieved from the backend with the component's state.
    useEffect(() => {
        setDone(video?.isDone ?? false);
    }, [video]);

    const handleDoneClick = async () => {
        // this is just to avoid react anger :)
        if (!course) return;

        /**
         * The first implementation I came with was to define a new function in the course context
         * that requests a new copy of the videos and course, this was inefficient and not necessary.
         *
         * The second implementation which is the current one is to update the course and videos
         * state locally in the client side without requesting a new copy from the server while keeping
         * the server in sync with the client side. this reduced the number of requests to the server
         * and made the app more efficient. And each time the user refreshes the page, the data will be
         * fetched from the server.
         */

        let updatedCourse: CourseContextInterface;
        setLoading(true);
        // if already done then delete the done status
        if (done) {
            const response = await fetch(
                `http://localhost:5050/api/videos/finished`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": accessToken,
                    },
                    body: JSON.stringify({
                        courseId,
                        videoId,
                        userId: user?.uid ?? null,
                    }),
                }
            );

            const data = await response.json();

            if (response.status !== 200) {
                setError(data.message);
                setLoading(false);
                return;
            }

            updatedCourse = {
                ...course,
                completed: (course?.completed ?? 1) - 1,
            };

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
                        "x-access-token": accessToken,
                    },
                    body: JSON.stringify({
                        courseId,
                        videoId,
                        userId: user?.uid ?? null,
                    }),
                }
            );

            const data = await response.json();

            if (response.status !== 200) {
                setError(data.message);
                setLoading(false);
                return;
            }
            updatedCourse = {
                ...course,
                completed: (course?.completed ?? -1) + 1,
            };

            setDone(true);
        }

        const updatedVideos = videos.map((video) => {
            if (video.courseId === courseId && video.id === videoId) {
                return { ...video, isDone: !video.isDone };
            }

            return video;
        });

        setCourse(updatedCourse);
        setVideos(updatedVideos);

        setLoading(false);
    };

    const handlePrevClick = () => {
        // set true to avoid race condition
        setActiveVideoIdx(activeVideoIdx - 1);
        navigate(`/course/${courseId}/${videos[activeVideoIdx - 1].id}`);
    };

    const handleNextClick = () => {
        // set true to avoid race condition
        setIsNextDisabled(true);

        setActiveVideoIdx(activeVideoIdx + 1);
        navigate(`/course/${courseId}/${videos[activeVideoIdx + 1].id}`);
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
                        {instructors.map(({ fullName }: Instructor, idx) => {
                            return (
                                (fullName === null ? "unknown" : fullName) +
                                (idx === instructors.length - 1 ? "" : ", ")
                            );
                        })}
                    </div>
                    <div className="video__description">
                        {video.description}
                    </div>
                    <div className="video__nav">
                        {user && (
                            <button
                                className={`done-btn ${done ? "done" : null}`}
                                onClick={handleDoneClick}
                                disabled={loading}
                            >
                                Done
                            </button>
                        )}
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
