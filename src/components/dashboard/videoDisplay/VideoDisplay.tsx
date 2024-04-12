import "./VideoDisplay.scss";
import { useEffect, useState } from "react";
import { CourseVideos } from "../../../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import EditVideo from "../editVideo/EditVideo";
import ConfirmCard from "../../confrimCard/ConfirmCard";
import { useAccessToken } from "../../../contexts/AccessTokenContext";

interface VideoDisplayProps {
    video: CourseVideos;
    videos: CourseVideos[];
    setRefresh: (state: any) => void;
}

function VideoDisplay({ video, videos, setRefresh }: VideoDisplayProps) {
    const { title, description, durationInMinutes, orderNb } = video;
    const [isConfirm, setIsConfirm] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // const accessToken = useAccessToken();

    // useEffect(() => {
    //     const deleteCourse = async () => {
    //         try {
    //             const response = await fetch(
    //                 process.env.REACT_APP_API_URL + `/api/courses/${id}`,
    //                 {
    //                     method: "DELETE",
    //                     headers: {
    //                         "content-type": "application/json",
    //                         "x-access-token": accessToken,
    //                     },
    //                 }
    //             );

    //             if (response.ok) {
    //                 setRefresh((prev: boolean) => !prev);
    //                 setIsDelete(false);
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     if (isDelete) deleteCourse();
    // }, [isDelete, accessToken, id, setRefresh]);

    return (
        <div className="video-display">
            {isEditing && (
                <EditVideo
                    video={video}
                    setIsEditing={setIsEditing}
                    setRefresh={setRefresh}
                />
            )}
            {isConfirm && (
                <ConfirmCard
                    setIsConfirm={setIsConfirm}
                    setIsDelete={setIsDelete}
                    setRefresh={setRefresh}
                />
            )}
            <div className="video-display__img">
                <FontAwesomeIcon icon={faYoutube} />
            </div>
            <div className="video-display__content">
                <div>
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
                <div className="video-display__content__details">
                    <div className="video-display__content__details__duration">
                        Duration: {durationInMinutes} minutes
                    </div>
                </div>
            </div>
            <div className="video-display__control">
                <span className="edit" onClick={() => setIsEditing(true)}>
                    <FontAwesomeIcon icon={faEdit} />
                </span>
                <span className="delete" onClick={() => setIsConfirm(true)}>
                    <FontAwesomeIcon icon={faTrash} />
                </span>
            </div>
        </div>
    );
}

export default VideoDisplay;
