import "./CourseCard.scss";
import { Link } from "react-router-dom";

interface CourseCardProps {
    id: string;
    img: string;
    title: string;
    description: string;
    durationInMinutes: number;
    level: string;
    isPremium: boolean;
}

function CourseCard({
    id,
    img,
    title,
    description,
    durationInMinutes,
    level,
    isPremium,
}: CourseCardProps) {
    const levelObj = {
        beginner: "is-easy",
        intermediate: "is-medium",
        advanced: "is-hard",
    };

    return (
        <div className="course-card">
            {!!isPremium && (
                <div className="course-card__premium__ribon">
                    <span>Premium</span>
                </div>
            )}
            <Link to={`/course/${id}`}>
                <div className="course-card__img">
                    <img src={img} alt={`course ${id}`} />
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
