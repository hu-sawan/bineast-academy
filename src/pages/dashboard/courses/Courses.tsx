import "./Courses.scss";
import { useEffect, useState } from "react";
import Header from "../../../components/dashboard/header/Header";
import { useAccessToken } from "../../../contexts/AccessTokenContext";
import { Course } from "../../../types/types";
import Loading from "../../../components/loading/Loading";
import CourseDisplay from "../../../components/dashboard/courseDisplay/CourseDisplay";
import ErrorCard from "../../../components/error/ErrorCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../contexts/AuthContext";
import EditCourse from "../../../components/dashboard/editCourse/EditCourse";
import { useTheme } from "../../../contexts/ThemeContext";

function Courses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [refresh, setRefresh] = useState<boolean>(false);
    const [isAdding, setIsAdding] = useState<boolean>(false);

    const { user } = useAuth();

    const accessToken = useAccessToken();
    const { theme } = useTheme();

    useEffect(() => {
        const getCourses = async () => {
            const ENDPOINT =
                user?.role.toLowerCase() === "admin"
                    ? "/api/courses/admin"
                    : `/api/courses/instructor/${user?.id}`;
            try {
                setError("");
                setLoading(true);
                const response = await fetch(
                    process.env.REACT_APP_API_URL + ENDPOINT,
                    {
                        method: "GET",
                        headers: {
                            "content-type": "application/json",
                            "x-access-token": accessToken,
                        },
                    }
                );
                const data = await response.json();

                if (response.status !== 200) throw new Error(data.message);

                setCourses(data);
                setLoading(false);
                if (data.length === 0) setError("No courses available");
            } catch (err) {
                setLoading(false);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Error fetching data from server");
                }
            }
        };
        getCourses();
    }, [refresh, accessToken, user?.role, user?.id]);

    return (
        <div className="dashboard-courses">
            <div className="dashboard-courses__header">
                <Header
                    title="Courses"
                    subtitle="In this page you can manage courses"
                />
                {user?.role.toLowerCase() === "instructor" && (
                    <div
                        className="dashboard-courses__add"
                        onClick={() => setIsAdding(true)}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Add Course
                    </div>
                )}
            </div>
            <div className="courses">
                {isAdding && (
                    <EditCourse
                        setIsEditing={setIsAdding}
                        course={{
                            title: "",
                            description: "",
                            id: "",
                            durationInMinutes: 0,
                            isPremium: false,
                            imgUrl: "",
                            level: "beginner",
                            visibility: "public",
                            tags: "",
                        }}
                        setRefresh={setRefresh}
                        isAdding={true}
                    />
                )}
                {loading || error ? (
                    <div className="dashboard-courses__status">
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
                    courses.map((course) => (
                        <CourseDisplay
                            key={course.id}
                            setRefresh={setRefresh}
                            course={course}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default Courses;
