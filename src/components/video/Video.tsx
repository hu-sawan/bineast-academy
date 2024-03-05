import "./Video.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Loading from "../loading/Loading";
import ErrorCard from "../error/ErrorCard";
import { instructor } from "../../types/types";

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
    const [instructors, setInstructors] = useState<instructor[]>([
        { id: -1, instructorFullName: "Unknown", email: "N/A" },
    ]);
    // ! also compare it to the total number of videos retrieved from the context to know the initial state
    // ! of the buttons
    const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false);
    const [isPrevDisabled, setIsPrevDisabled] = useState<boolean>(
        orderNb === "1" ? true : false
    );
    // ! The initial state should be retrieved from the video it self
    // TODO: add done attribute to the video object and set a useEffect to update the
    // TODO: database when the done state is changed to insure consistency
    const [done, setDone] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    // ! uncomment fetch statements
    useEffect(() => {
        const getVideo = async () => {
            try {
                setError("");
                setVideo(null);
                const response = await fetch(
                    `http://localhost:5050/api/videos/details/${courseId}/${orderNb}`
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

        const getInstructor = async () => {
            const response = await fetch(
                `http://localhost:5050/api/courses/instructor/${courseId}`
            );
            const data = await response.json();
            setInstructors(data);
        };

        // getInstructor();
    }, [courseId, orderNb]);

    // TODO: implement a patch request to update the done state in the database
    // useEffect(()=>{}, [done])

    const handleDoneClick = () => {
        setDone(!done);
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

        // TODO: finish setting up the context and then retreive the video count from the context
        // ! check if we reached the end of the video list
        // ! temporary will use static value
        if (nextOrderNb === 11) {
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
        <div className="video">
            {!video ? (
                <Loading />
            ) : (
                <>
                    <div className="video__heading">
                        <h2>{video.title}</h2>
                        {done && (
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
                    {/* TODO: khallesa bel jem3a */}
                    <div className="video__nav">
                        <button onClick={handleDoneClick}>Done</button>
                        <button
                            onClick={handlePrevClick}
                            disabled={isPrevDisabled}
                        >
                            Prev
                        </button>
                        <button
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
