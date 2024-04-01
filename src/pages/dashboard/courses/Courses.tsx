import "./Courses.scss";
import { useEffect, useState } from "react";
import Header from "../../../components/dashboard/header/Header";
import { useAccessToken } from "../../../contexts/AccessTokenContext";
import { Course } from "../../../types/types";
import Loading from "../../../components/loading/Loading";
import CourseDisplay from "../../../components/dashboard/courseDisplay/CourseDisplay";
import ErrorCard from "../../../components/error/ErrorCard";

function Courses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [refresh, setRefresh] = useState<boolean>(false);

    const accessToken = useAccessToken();

    useEffect(() => {
        const getCourses = async () => {
            try {
                setError("");
                setLoading(true);
                const response = await fetch(
                    process.env.REACT_APP_API_URL + "/api/courses",
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
    }, [refresh, accessToken]);

    return (
        <div className="dashboard-courses">
            <Header
                title="Courses"
                subtitle="In this page you can manage courses"
            />
            <div className="courses">
                {loading || error ? (
                    <div className="dashboard-courses__status">
                        {loading ? <Loading /> : <ErrorCard message={error} />}
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
