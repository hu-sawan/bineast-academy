import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Trie from "../../datastructures/Trie";

function Search() {
    const [word, setWord] = useState<string>("");
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value);

        const completions = trie.complete(e.target.value.toLowerCase());

        setSuggestions(completions);
    };

    type courseType = {
        courseTitle: string;
        courseId: number;
    };

    const courses: courseType[] = useMemo(
        () => [
            { courseTitle: "intro to c++", courseId: 1 },
            { courseTitle: "web application", courseId: 2 },
            { courseTitle: "Intro to programming", courseId: 3 },
            { courseTitle: "advanced web", courseId: 4 },
        ],
        []
    );

    const coursesTitle = useMemo(
        () => courses.map((course) => course.courseTitle.toLowerCase()),
        [courses]
    );
    const trie = useMemo(() => new Trie(coursesTitle), [coursesTitle]);

    return (
        <div className="search">
            <input
                onChange={handleChange}
                type="text"
                placeholder="Search..."
                name="navInput"
                value={word}
            />
            <div className="search__icon">
                <FontAwesomeIcon icon={faSearch} />
            </div>
            {courses.length && (
                <ul className="suggestion-list">
                    {word.length !== 0 &&
                        (suggestions.length === 0 ? (
                            <li className="no-hover">Course not found!</li>
                        ) : (
                            suggestions.map((suggestion, idx) => {
                                const course = courses.find(
                                    (course) =>
                                        course.courseTitle.toLowerCase() ===
                                        suggestion.toLowerCase()
                                )!;
                                return (
                                    <Link
                                        key={idx}
                                        to={`course/${course.courseId}`}
                                    >
                                        <li>{course.courseTitle}</li>
                                    </Link>
                                );
                            })
                        ))}
                </ul>
            )}
        </div>
    );
}

export default Search;
