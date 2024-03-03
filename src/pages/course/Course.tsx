import "./Course.scss";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import ErrorCard from "../../components/error/ErrorCard";

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
    courseTitle: string;
}

function Course() {
    const { courseId } = useParams();
    // const [userInfo, setUserInfo] = useState<userInfoInterface | null>(null);
    const [courseVideos, setCourseVideos] = useState<courseVideos[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
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
            try {
                setLoading(true);
                const response = await fetch(
                    `http://localhost:5050/api/courses/${courseId}`
                );
                const data = await response.json();
                setCourseVideos(data);
                setLoading(false);
            } catch (error) {
                if (error instanceof Error) {
                    setError("Something wrong happened!");
                } else {
                    setError("Error fetching data from server");
                }
            }
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

    const isCourseTitleLong = loading
        ? false
        : courseVideos[0].courseTitle.length > 65;

    if (error) return <ErrorCard message={error} />;

    return (
        <div className="container">
            <div className="course">
                {loading && <Loading />}
                <div className="wrapper">
                    <div className="course__nav">
                        <div className="course__nav__head">
                            <Link
                                className="course__nav__head__back tooltip bottom"
                                to="/"
                                data-tooltip="home"
                            >
                                <FontAwesomeIcon
                                    className="course__nav__head__icon"
                                    icon={faArrowLeft}
                                />
                            </Link>

                            <h2
                                data-tooltip={`${
                                    isCourseTitleLong
                                        ? courseVideos[0].courseTitle
                                        : null
                                }`}
                                className={`${
                                    isCourseTitleLong ? "tooltip bottom" : null
                                }`}
                            >
                                {!loading &&
                                    (isCourseTitleLong
                                        ? `${courseVideos[0].courseTitle.slice(
                                              0,
                                              65
                                          )}...`
                                        : courseVideos[0].courseTitle)}
                            </h2>
                        </div>
                        <div className="course__nav__list">
                            {courseVideos.map(
                                ({ orderNb, title }: courseVideos, idx) => {
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
                                                    class_name += `tooltip ${
                                                        idx === 0
                                                            ? "bottom"
                                                            : "top"
                                                    }`;

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
