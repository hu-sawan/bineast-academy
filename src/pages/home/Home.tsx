import CourseCard from "../../components/courseCard/CourseCard";
import "./Home.scss";

type course = {
    id: number;
    title: string;
    description: string;
    duration: number;
    level: "Beginner" | "Medium" | "Hard" | "beginner" | "medium" | "hard";
    img: string;
    tags: string[];
    isPremium: boolean;
};

// playlist object:
const courses: course[] = [
    {
        id: 1,
        title: "Intro to programming with c++",
        description:
            "mastering c++ from 0 to Hero I want to see how long txt is handled",
        duration: 4.5,
        level: "Beginner",
        img: "https://via.placeholder.com/300x200",
        tags: ["c++", "programming", "beginner"],
        isPremium: true,
    },
    {
        id: 2,
        title: "Intro to programming with c++",
        description:
            "mastering c++ from 0 to Hero I want to see how long txt is handled",
        duration: 4.5,
        level: "Beginner",
        img: "https://via.placeholder.com/300x200",
        tags: ["c++", "programming", "beginner"],
        isPremium: false,
    },
    {
        id: 3,
        title: "Intro to programming with c++",
        description:
            "mastering c++ from 0 to Hero I want to see how long txt is handled",
        duration: 4.5,
        level: "Beginner",
        img: "https://via.placeholder.com/300x200",
        tags: ["c++", "programming", "beginner"],
        isPremium: false,
    },
    {
        id: 4,
        title: "Intro to programming with c++",
        description:
            "mastering c++ from 0 to Hero I want to see how long txt is handled",
        duration: 4.5,
        level: "Beginner",
        img: "https://via.placeholder.com/300x200",
        tags: ["c++", "programming", "beginner"],
        isPremium: true,
    },
    {
        id: 5,
        title: "Intro to programming with c++",
        description:
            "mastering c++ from 0 to Hero I want to see how long txt is handled",
        duration: 4.5,
        level: "Medium",
        img: "https://via.placeholder.com/300x200",
        tags: ["c++", "programming", "beginner"],
        isPremium: true,
    },
    {
        id: 6,
        title: "Intro to programming with c++",
        description:
            "mastering c++ from 0 to Hero I want to see how long txt is handled",
        duration: 4.5,
        level: "Hard",
        img: "https://via.placeholder.com/300x200",
        tags: ["c++", "programming", "beginner"],
        isPremium: false,
    },
    {
        id: 7,
        title: "Intro to programming with c++",
        description:
            "mastering c++ from 0 to Hero I want to see how long txt is handled",
        duration: 4.5,
        level: "Beginner",
        img: "https://via.placeholder.com/300x200",
        tags: ["c++", "programming", "beginner"],
        isPremium: false,
    },
];

function Home() {
    return (
        <div className="home">
            <div className="home__featured">
                <div className="container">
                    <div className="home__featured__wrapper">
                        <h1>Courses:</h1>
                        <div className="home__featured__content">
                            {courses.map(
                                (
                                    {
                                        id,
                                        title,
                                        description,
                                        level,
                                        img,
                                        duration,
                                        tags,
                                        isPremium,
                                    }: course,
                                    idx: number
                                ) => (
                                    <CourseCard
                                        id={id}
                                        title={title}
                                        description={description}
                                        duration={duration}
                                        level={level}
                                        img={img}
                                        tags={tags}
                                        isPremium={isPremium}
                                        key={idx}
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
