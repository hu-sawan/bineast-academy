import "./Home.scss";
import { lazy, useEffect, useState } from "react";
import { Course } from "../../types/types";
import { useAccessToken } from "../../contexts/AccessTokenContext";

const CourseCard = lazy(() => import("../../components/courseCard/CourseCard"));
const Loading = lazy(() => import("../../components/loading/Loading"));
const ErrorCard = lazy(() => import("../../components/error/ErrorCard"));

function Home() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
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
    }, [accessToken]);

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
                                            imgUrl={imgUrl}
                                            isPremium={isPremium}
                                            key={idx}
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
