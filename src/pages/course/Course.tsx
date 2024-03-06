import "./Course.scss";
// import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
// import Loading from "../../components/loading/Loading";
import ErrorCard from "../../components/error/ErrorCard";
import { courseVideos } from "../../types/types";
import { useCourse } from "../../contexts/CourseContext";
import Loading from "../../components/loading/Loading";

function Course() {
    const { courseId } = useParams();
    // const [userInfo, setUserInfo] = useState<userInfoInterface | null>(null);
    const { videos, course, setCourseId } = useCourse();

    useEffect(() => {
        if (!videos || !course) {
            setCourseId(courseId ?? "");
        }
    }, [course, courseId, setCourseId, videos]);

    const isCourseTitleLong = !course ? false : course.title.length > 65;

    return (
        <div className="container">
            <div className="course">
                <div className="wrapper">
                    {(!course || !videos) && <Loading />}
                    <div className="course__nav">
                        <div className="course__nav__head">
                            <div className="course__nav__head__title">
                                <Link
                                    className="course__nav__head__title__back tooltip bottom"
                                    to="/"
                                    data-tooltip="home"
                                >
                                    <FontAwesomeIcon
                                        className="course__nav__head__icon"
                                        icon={faArrowLeft}
                                    />
                                </Link>
                                {course && (
                                    <h2
                                        data-tooltip={`${
                                            isCourseTitleLong
                                                ? course.title
                                                : null
                                        }`}
                                        className={`${
                                            isCourseTitleLong
                                                ? "tooltip bottom"
                                                : null
                                        }`}
                                    >
                                        {isCourseTitleLong
                                            ? `${course.title.slice(0, 65)}...`
                                            : course.title}{" "}
                                    </h2>
                                )}
                            </div>
                            <div className="done__videos">
                                {course?.completed ?? 0} out of {videos?.length}
                                <div className="done__videos__progress">
                                    <span
                                        style={{
                                            width: `${
                                                ((course?.completed ?? 0) /
                                                    (videos?.length ?? 1)) *
                                                100
                                            }%`,
                                        }}
                                    ></span>
                                </div>
                            </div>
                        </div>
                        <div className="course__nav__list">
                            {videos &&
                                videos.map(
                                    (
                                        {
                                            orderNb,
                                            title,
                                            isDone,
                                        }: courseVideos,
                                        idx
                                    ) => {
                                        const TEXT_OFFSET: number = 35;
                                        const isLong =
                                            title.length > TEXT_OFFSET;
                                        return (
                                            <NavLink
                                                data-tooltip={
                                                    isLong ? title : null
                                                }
                                                key={orderNb}
                                                to={`/course/${courseId}/${orderNb}`}
                                                className={({ isActive }) => {
                                                    let class_name = "";

                                                    if (isActive)
                                                        class_name += "active ";

                                                    if (isLong)
                                                        class_name += `tooltip ${
                                                            idx === 0
                                                                ? "bottom "
                                                                : "top "
                                                        }`;

                                                    if (isDone)
                                                        class_name += "done ";

                                                    return class_name;
                                                }}
                                            >
                                                <span className="course__nav__id">
                                                    {orderNb}
                                                </span>
                                                <span className="course__nav__title">
                                                    {isLong
                                                        ? `${title.slice(
                                                              0,
                                                              TEXT_OFFSET + 1
                                                          )}...`
                                                        : title}
                                                </span>
                                            </NavLink>
                                        );
                                    }
                                )}
                        </div>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Course;
