import "./Home.scss";
import { useEffect, useState } from "react";
import CourseCard from "../../components/courseCard/CourseCard";
import Loading from "../../components/loading/Loading";
import ErrorCard from "../../components/error/ErrorCard";
import { Course } from "../../types/types";
import { useCourse } from "../../contexts/CourseContext";
import { useAccessToken } from "../../contexts/AccessTokenContext";

function Home() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const { setCourseId } = useCourse();
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
                        {loading || error ? (
                            <div className="home__featured__status">
                                {loading && <Loading />}
                                {error && <ErrorCard message={error} />}
                            </div>
                        ) : (
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
                                        }: Course,
                                        idx: number
                                    ) => (
                                        <CourseCard
                                            id={id}
                                            title={title}
                                            description={description}
                                            durationInMinutes={
                                                durationInMinutes
                                            }
                                            level={level}
                                            img={imgUrl}
                                            isPremium={isPremium}
                                            key={idx}
                                            setCourseId={setCourseId}
                                        />
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
