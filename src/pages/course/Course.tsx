import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Course.scss";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

interface userInfoInterface {
    id: string;
    email: string;
    role: string;
    isPremium: boolean;
}

// ! will change
interface courseVideos {
    orderNb: number;
    title: string;
}

function Course() {
    const { courseId } = useParams();
    const [userInfo, setUserInfo] = useState<userInfoInterface | null>(null);
    const [courseVideos, setCourseVideos] = useState<courseVideos[]>([]);
    const user = useAuth();

    // Get userInfo from our database to check if he is a premium User or not
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const response = await fetch(
    //                 `http://localhost:5050/api/user/${user?.uid}`
    //             );

    //             if (!response.ok) throw new Error("something wrong happened!");

    //             const data = await response.json();
    //             setUserInfo(data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     if (user) fetchUser();
    // }, [user]);

    // get all related videos we need only the title and orderNb
    useEffect(() => {
        const getVideos = async () => {
            const response = await fetch(
                `http://localhost:5050/api/courses/${courseId}`
            );
            const data = await response.json();
            setCourseVideos(data);
        };

        getVideos();
    }, [courseId]);

    // commented temporary to allow github domain users see content
    // TODO: remove commments
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
    // if (courses.isPremium && userInfo.isPremium === false)
    //     return <AccessDenied />; // TODO: implement AccessDenied Page

    // API call to get all videos related to this course:

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
                            {/* make it display the course title */}
                            {/* <h1 data-tooltip={courseTitle.length > 20 ? courseTitle ? null}>Course {id}</h1> */}
                            <h1>Course {courseId}</h1>
                        </div>
                        <div className="course__nav__list">
                            {courseVideos.map(
                                ({ orderNb, title }: courseVideos) => {
                                    const TEXT_OFFSET: number = 35;
                                    const isLong = title.length > TEXT_OFFSET;
                                    return (
                                        <NavLink
                                            data-tooltip={isLong ? title : null}
                                            key={orderNb}
                                            to={`/course/${courseId}/${orderNb}`}
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
