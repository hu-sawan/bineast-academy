// import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Course.scss";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Course() {
    const { id } = useParams();
    // const user = useAuth();

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
    ];

    return (
        <div className="container">
            <div className="course">
                {/* TODO: change it with the actual name */}
                <div className="course__head">
                    <Link
                        className="course__head__back tooltip bottom"
                        to="/"
                        data-tooltip="back"
                    >
                        <FontAwesomeIcon
                            className="course__head__icon"
                            icon={faArrowLeft}
                        />
                    </Link>
                    <h1>Course {id}</h1>
                </div>
                <div className="wrapper">
                    <div className="course__nav">
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

                                        if (isActive) class_name += "active ";

                                        if (isLong) class_name += "tooltip top";

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
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Course;
