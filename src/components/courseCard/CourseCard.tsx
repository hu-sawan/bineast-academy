import "./CourseCard.scss";
import { Link } from "react-router-dom";

interface CourseCardProps {
    id: number;
    img: string;
    title: string;
    description: string;
    duration: number;
    level: string;
    tags: string[];
}

function CourseCard({
    id,
    img,
    title,
    description,
    duration,
    level,
}: CourseCardProps) {
    return (
        <div className="course-card">
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
                        <span className="duration">{duration} hours</span>
                        <span className={`level ${level.toLowerCase()}`}>
                            {level}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default CourseCard;
