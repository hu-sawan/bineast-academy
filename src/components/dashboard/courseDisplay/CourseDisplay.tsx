import "./CourseDisplay.scss";
import { Course } from "../../../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faTrash,
    faEye,
    faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { lazy, useEffect, useState } from "react";
import { useAccessToken } from "../../../contexts/AccessTokenContext";
import EditCourse from "../editCourse/EditCourse";
import { Link, useLocation } from "react-router-dom";

const ConfirmCard = lazy(() => import("../../confrimCard/ConfirmCard"));

interface CourseDisplayProps {
    course: Course;
    setRefresh: (state: any) => void;
}

function CourseDisplay({ course, setRefresh }: CourseDisplayProps) {
    const [isConfirm, setIsConfirm] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const location = useLocation();

    const currPath = location.pathname;

    const {
        id,
        imgUrl,
        title,
        description,
        durationInMinutes,
        level,
        isPremium,
        visibility,
    } = course;

    const accessToken = useAccessToken();

    useEffect(() => {
        const deleteCourse = async () => {
            try {
                const response = await fetch(
                    process.env.REACT_APP_API_URL + `/api/courses/${id}`,
                    {
                        method: "DELETE",
                        headers: {
                            "content-type": "application/json",
                            "x-access-token": accessToken,
                        },
                    }
                );

                if (response.ok) {
                    setRefresh((prev: boolean) => !prev);
                    setIsDelete(false);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (isDelete) deleteCourse();
    }, [isDelete, accessToken, id, setRefresh]);

    return (
        <div className="course-display">
            {isConfirm && (
                <ConfirmCard
                    setIsConfirm={setIsConfirm}
                    setIsDelete={setIsDelete}
                    setRefresh={setRefresh}
                />
            )}
            {isEditing && (
                <EditCourse
                    course={course}
                    setIsEditing={setIsEditing}
                    setRefresh={setRefresh}
                />
            )}
            <Link
                to={`${currPath}/${course.id}`}
                className="course-display__link"
            >
                <div className="course-display__img">
                    <img src={imgUrl} alt={title} />
                </div>
                <div className="course-display__content">
                    <div className="video-display__content__title">
                        <div>
                            <h1>{title}</h1>
                            <p>{description}</p>
                        </div>
                        <div
                            data-tooltip={`${visibility}`}
                            className="visibility tooltip bottom"
                        >
                            {visibility?.toLowerCase() === "public" ? (
                                <FontAwesomeIcon icon={faEye} />
                            ) : (
                                <FontAwesomeIcon icon={faEyeSlash} />
                            )}
                        </div>
                    </div>
                    <div className="course-display__content__details">
                        <div className="course-display__content__details__duration">
                            Duration: {durationInMinutes} minutes
                        </div>
                        <div className="course-display__content__details__level">
                            Level: {level}
                        </div>
                        <div className="course-display__content__details__is-premium">
                            {isPremium ? "Premium" : "Free"}
                        </div>
                    </div>
                </div>
            </Link>
            <div className="course-display__control">
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

export default CourseDisplay;
