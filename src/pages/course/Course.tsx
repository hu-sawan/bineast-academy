import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Course.scss";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Course() {
    const [countDown, setCountDown] = useState<number>(5);
    const { id } = useParams();
    const user = useAuth();

    console.log(user);
    if (!user) {
        return (
            <>
                <h1>Not logged in</h1>
                Return{" "}
                <Link to="/" style={{ textDecoration: "underline" }}>
                    Home
                </Link>
            </>
        );
    }

    // API call to get course info and to see if is a premium course
    // const course = apiCall();

    // if it is a premium course and no user is signed or he is not a premium member then deny acces
    // if (courses.isPremium && (!user || user.isPremium === false))
    //     return <AccessDenied />; // TODO: implement AccessDenied Page

    // API call to get all videos related to this course:

    // ! will change
    interface courseVideos {
        vidId: number;
        title: string;
    }
    const courses: courseVideos[] = [
        { vidId: 0, title: "Base" },
        { vidId: 1, title: "Introduction to loops - first part part" },
        { vidId: 2, title: "First video" },
        { vidId: 3, title: "Second video" },
        { vidId: 4, title: "Third video" },
        { vidId: 5, title: "Fourth video" },
        { vidId: 6, title: "Fifth video" },
        { vidId: 7, title: "Sixth video" },
        { vidId: 8, title: "Seventh video" },
        { vidId: 9, title: "Eighth video" },
        { vidId: 10, title: "Ninth video" },
        { vidId: 11, title: "Tenth video" },
        { vidId: 12, title: "Eleventh video" },
        { vidId: 13, title: "Twelfth video" },
        { vidId: 14, title: "Thirteenth video" },
        { vidId: 15, title: "Fourteenth video" },
        { vidId: 16, title: "Fifteenth video" },
    ];

    return (
        <div className="container">
            <div className="course">
                <div className="wrapper">
                    <div className="course__nav">
                        {/* TODO: change it with the actual name */}
                        <div className="course__nav__head">
                            <Link
                                className="course__nav__head__back tooltip bottom"
                                to="/"
                                data-tooltip="back"
                            >
                                <FontAwesomeIcon
                                    className="course__nav__head__icon"
                                    icon={faArrowLeft}
                                />
                            </Link>
                            <h1>Course {id}</h1>
                        </div>
                        <div className="course__nav__list">
                            {courses.map(({ vidId, title }: courseVideos) => {
                                const TEXT_OFFSET: number = 35;
                                const isLong = title.length > TEXT_OFFSET;
                                return (
                                    <NavLink
                                        data-tooltip={isLong ? title : null}
                                        key={vidId}
                                        to={`/course/${id}/${vidId}`}
                                        className={({ isActive }) => {
                                            let class_name = "";

                                            if (isActive)
                                                class_name += "active ";

                                            if (isLong)
                                                class_name += "tooltip top";

                                            return class_name;
                                        }}
                                    >
                                        <span className="course__nav__id">
                                            {vidId}
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
                            })}
                        </div>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Course;
