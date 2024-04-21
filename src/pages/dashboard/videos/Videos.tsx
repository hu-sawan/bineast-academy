import "./Videos.scss";
import { Link, useLocation, useParams } from "react-router-dom";
import Header from "../../../components/dashboard/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { Video } from "../../../types/types";
import { useAccessToken } from "../../../contexts/AccessTokenContext";
import Loading from "../../../components/loading/Loading";
import ErrorCard from "../../../components/error/ErrorCard";
import VideoDisplay from "../../../components/dashboard/videoDisplay/VideoDisplay";
import EditVideo from "../../../components/dashboard/editVideo/EditVideo";
import { useTheme } from "../../../contexts/ThemeContext";

function Videos() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [videos, setVideos] = useState<Video[]>([]);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [prevLocation, setPrevLocation] = useState<string>("");
    const { courseId } = useParams();
    const { user } = useAuth();
    const accessToken = useAccessToken();
    const { theme } = useTheme();

    const location = useLocation();

    useEffect(() => {
        let arr = location.pathname.split("/");

        while (arr[arr.length - 1] === "") arr.pop();
        arr.pop();

        setPrevLocation(arr.join("/"));
    }, [location.pathname]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5050/api/videos/${courseId}`,
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

                setVideos(data);
                setLoading(false);
                if (data.length === 0) setError("No videos available");
            } catch (err) {
                setLoading(false);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Error fetching data from server");
                }
            }
        };

        if (courseId) fetchVideos();
        else setVideos([]);
    }, [courseId, user, refresh, accessToken]);

    return (
        <div className="dashboard-course">
            <div className="dashboard-course__header">
                <Link to={prevLocation}>
                    <div
                        data-tooltip="Back"
                        className="dashboard-course__header__nav tooltip bottom"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                </Link>

                <div className="dashboard-course__header__details">
                    <Header
                        title="Videos"
                        subtitle="In this page you can view and add videos to the selected course"
                    />
                    {user?.role.toLowerCase() === "instructor" && (
                        <div
                            className="dashboard-course__add"
                            onClick={() => setIsAdding(true)}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            Add Video
                        </div>
                    )}
                </div>
            </div>
            <div className="dashboard-course__videos">
                {isAdding && (
                    <EditVideo
                        video={{
                            id: "",
                            orderNb: 0,
                            courseId: courseId ?? "",
                            durationInMinutes: 0,
                            title: "",
                            description: "",
                            videoUrl: "",
                        }}
                        isAdding={isAdding}
                        setIsEditing={setIsAdding}
                        setRefresh={setRefresh}
                    />
                )}
                {loading || error ? (
                    <div className="dashboard-course__videos__status">
                        {loading ? (
                            <Loading
                                backgroundColor={
                                    theme === "dark" ? "#141b2d" : ""
                                }
                                particlesBackgroundColor={
                                    theme === "dark" ? "#1f2a40" : "#f2f0f0"
                                }
                            />
                        ) : (
                            <ErrorCard message={error} />
                        )}
                    </div>
                ) : (
                    videos.map((video, idx) => {
                        return (
                            <VideoDisplay
                                key={idx}
                                video={video}
                                videos={videos}
                                setRefresh={setRefresh}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default Videos;
