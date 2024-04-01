import "./CourseCard.scss";
import { Course } from "../../types/types";
import { Link } from "react-router-dom";
import { useCourse } from "../../contexts/CourseContext";

function CourseCard({
    id,
    imgUrl,
    title,
    description,
    durationInMinutes,
    level,
    isPremium,
}: Course) {
    const levelObj = {
        beginner: "is-easy",
        intermediate: "is-medium",
        advanced: "is-hard",
    };

    const { setCourseId } = useCourse();

    return (
        <div className="course-card" onClick={() => setCourseId(id)}>
            {!!isPremium && (
                <div className="course-card__premium__ribon">
                    <span>Premium</span>
                </div>
            )}
            <Link to={`/course/${id}`}>
                <div className="course-card__img">
                    <img src={imgUrl} alt={`course ${id}`} />
                </div>
                <div className="course-card__details">
                    <h1>
                        {title.length > 55 ? title.slice(0, 55) + "..." : title}
                    </h1>
                    <p>{description}</p>
                    <div className="tags">
                        <span className="duration">
                            {(durationInMinutes / 60).toFixed(2)} hours
                        </span>
                        <span
                            className={`level ${
                                levelObj[
                                    level.toLowerCase() as keyof typeof levelObj
                                ]
                            }`}
                        >
                            {level}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default CourseCard;
