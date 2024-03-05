import { useEffect, useState } from "react";
import CourseCard from "../../components/courseCard/CourseCard";
// import { useAuth } from "../../contexts/AuthContext";
import "./Home.scss";
import Loading from "../../components/loading/Loading";
import ErrorCard from "../../components/error/ErrorCard";
import { course } from "../../types/types";
import { useCourse } from "../../contexts/CourseContext";

function Home() {
    const [courses, setCourses] = useState<course[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const { setCourseId } = useCourse();

    useEffect(() => {
        const getCourses = async () => {
            try {
                setError("");
                setLoading(true);
                const response = await fetch(
                    "http://localhost:5050/api/courses"
                );
                const data = await response.json();
                setCourses(data);
                setLoading(false);
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
    }, []);

    return (
        <div className="home">
            <div className="home__featured">
                <div className="container">
                    <div className="home__featured__wrapper">
                        {error && <ErrorCard message={error} />}
                        {loading && <Loading />}
                        <h1>Courses:</h1>
                        <div className="home__featured__content">
                            {courses.map(
                                (
                                    {
                                        id,
                                        title,
                                        description,
                                        level,
                                        imgUrl,
                                        durationInMinutes,
                                        isPremium,
                                    }: course,
                                    idx: number
                                ) => (
                                    <CourseCard
                                        id={id}
                                        title={title}
                                        description={description}
                                        durationInMinutes={durationInMinutes}
                                        level={level}
                                        img={imgUrl}
                                        isPremium={isPremium}
                                        key={idx}
                                        setCourseId={setCourseId}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
