import { useEffect, useState } from "react";
import CourseCard from "../../components/courseCard/CourseCard";
// import { useAuth } from "../../contexts/AuthContext";
import "./Home.scss";
import Loading from "../../components/loading/Loading";
import ErrorCard from "../../components/error/ErrorCard";
import { Course } from "../../types/types";
import { useCourse } from "../../contexts/CourseContext";
import useFetch from "../../hooks/useFetch";

function Home() {
    const [courses, setCourses] = useState<Course[]>([]);
    const { setCourseId } = useCourse();

    const { data, loading, error } = useFetch("courses");

    useEffect(() => {
        if (data) setCourses(data);
    }, [data]);

    return (
        <div className="home">
            <div className="home__featured">
                <div className="container">
                    <div className="home__featured__wrapper">
                        {(loading || error) && (
                            <div className="home__featured__status">
                                {loading && <Loading />}
                                {error && <ErrorCard message={error} />}
                            </div>
                        )}
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
