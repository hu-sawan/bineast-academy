import "./CourseDisplay.scss";
import { Course } from "../../../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { lazy, useEffect, useState } from "react";
import { useAccessToken } from "../../../contexts/AccessTokenContext";

const ConfirmCard = lazy(() => import("../../confrimCard/ConfirmCard"));
const EditCourse = lazy(() => import("../editCourse/EditCourse"));

interface CourseDisplayProps {
    course: Course;
    setRefresh: (state: any) => void;
}

function CourseDisplay({ course, setRefresh }: CourseDisplayProps) {
    const [isConfirm, setIsConfirm] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const {
        id,
        imgUrl,
        title,
        description,
        durationInMinutes,
        level,
        isPremium,
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

    const handleClick = () => {
        // logic
    };

    return (
        <div className="course-display" onClick={handleClick}>
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
            <div className="course-display__img">
                <img src={imgUrl} alt={title} />
            </div>
            <div className="course-display__content">
                <div>
                    <h1>{title}</h1>
                    <p>{description}</p>
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
