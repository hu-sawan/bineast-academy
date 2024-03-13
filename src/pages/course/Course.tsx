import "./Course.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { memo, useEffect } from "react";
import ErrorCard from "../../components/error/ErrorCard";
import { CourseVideos } from "../../types/types";
import { useCourse } from "../../contexts/CourseContext";
import Loading from "../../components/loading/Loading";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

interface NavListProps {
    courseId: string;
    videos: CourseVideos[];
    isSmallScreen: boolean;
}

// Separated this part into a separate component to prevent unnecesary rendering when the
// video component handled with the <Outlet /> is updated
const NavList = memo(({ courseId, videos, isSmallScreen }: NavListProps) => {
    return (
        <div className="course__nav__list">
            {videos &&
                videos.map(({ orderNb, title, isDone }: CourseVideos, idx) => {
                    const TEXT_OFFSET: number = 35;
                    // on small screens don't cut title
                    const isLong = isSmallScreen
                        ? false
                        : title.length > TEXT_OFFSET;
                    return (
                        <NavLink
                            data-tooltip={isLong ? title : null}
                            key={orderNb}
                            to={`/course/${courseId}/${orderNb}`}
                            className={({ isActive }) => {
                                let class_name = "";

                                if (isActive) class_name += "active ";

                                if (isLong)
                                    class_name += `tooltip ${
                                        idx === 0 ? "bottom " : "top "
                                    }`;

                                if (isDone) class_name += "done ";

                                return class_name;
                            }}
                        >
                            <span className="course__nav__id">{orderNb}</span>
                            <span className="course__nav__title">
                                {isLong
                                    ? `${title.slice(0, TEXT_OFFSET + 1)}...`
                                    : title}
                            </span>
                        </NavLink>
                    );
                })}
        </div>
    );
});

function Course() {
    const { courseId } = useParams();
    const { videos, course, contextError, setCourseId } = useCourse();
    const { user } = useAuth();
    const { isSmallScreen } = useTheme();

    useEffect(() => {
        if (!videos || !course) {
            setCourseId(courseId ?? "");
        }
    }, [course, courseId, setCourseId, videos]);

    // If the user is not logged in and the course is premium then show an error message
    if (!user && course?.isPremium) {
        return (
            <div className="status__holder">
                <ErrorCard
                    message="You need to be logged in to access this course"
                    position="relative"
                    fill={true}
                />
            </div>
        );
    }

    // If the user is not a premium member and the course is premium then show an error message
    if (user && !user.isPremium && course?.isPremium) {
        return (
            <div className="status__holder">
                <ErrorCard
                    message="You need to be a premium member to access this course"
                    position="relative"
                    fill={true}
                />
            </div>
        );
    }

    // on small screens don't cut the course title
    const isCourseTitleLong = isSmallScreen
        ? false
        : !course
        ? false
        : course.title.length > 65;

    return (
        <div className="container">
            <div className="course">
                <div className="wrapper">
                    {contextError && (
                        <ErrorCard message={contextError} fill={true} />
                    )}
                    <div className="course__nav">
                        {!contextError && (!course || !videos) && (
                            <Loading fill={true} onTop={true} />
                        )}
                        <div className="course__nav__head">
                            <div className="course__nav__head__title">
                                <Link
                                    className="course__nav__head__title__back tooltip bottom"
                                    to="/"
                                    data-tooltip="Home"
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
                            {(!course || !videos) && !contextError && (
                                <div className="done__videos">
                                    {course?.completed ?? 0} out of{" "}
                                    {videos?.length}
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
                            )}
                        </div>
                        <NavList
                            courseId={courseId ?? ""}
                            videos={videos}
                            isSmallScreen={isSmallScreen}
                        />
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Course;
