import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Trie from "../../datastructures/Trie";

function Search() {
    const [word, setWord] = useState<string>("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (suggestions.length) setLoading(true);
        setWord(e.target.value);
        if (!word) setSuggestions([]);
    };

    // TODO: add suggestion based on category:
    /**
     * Course object should be as follows:
     * {
     *      id: string;
     *      title: string;
     *      description: string;
     *      imgURL: string;
     *      duration: number; it will be the summation of all included videos
     *      level: string;
     *      keywords: string[]; will add this to the search functionality
     * }
     */

    /**
     * so basically search will depend on two main things:
     * 1- autocomplete
     * 2- keywords based search
     *
     * the first one is done, the second I am thinking in two approaches:
     * 1- when the courses object is recieved from the backend directly create a hashmap
     * the key will be the keyword and the value will be an array of all courses under that keyword
     * this is because multiple courses can have same keyword and this approach is more efficient
     * accessing the value will take O(1) and just we need to iterate through all values in the array and
     * render them
     *
     * 2- simply after the user type a keyword search in all available courses and get all courses having this
     * keyword but this is less efficient but easier to implement
     *
     * in both approaches the searching method is purely based on the user input so if we have a keyword of web
     * and the user only enters 'we' he will get course not found so we can add another trie for the
     * keywords to auto complete it but this would complicates things.
     */

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

    useEffect(() => {
        const time = setTimeout(() => {
            const completions = trie.complete(word.toLowerCase());

            setSuggestions(completions);
            setLoading(false);
        }, 500);

        return () => {
            clearTimeout(time);
        };
    }, [trie, word]);

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
                    {loading ? (
                        <li className="no-hover">Searching...</li>
                    ) : (
                        word.length !== 0 &&
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
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}

export default Search;
