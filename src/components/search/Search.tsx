import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCourse } from "../../contexts/CourseContext";

interface SuggestionsInterface {
    id: string;
    title: string;
}

function Search() {
    const { setCourseId } = useCourse();
    const [word, setWord] = useState<string>("");
    const [suggestions, setSuggestions] = useState<SuggestionsInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value);
        if (word.length === 0) {
            setSuggestions([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (word) {
            setLoading(true);
        } else {
            setLoading(false);
            setSuggestions([]);
        }

        const fetchData = async () => {
            setLoading(true);
            const response = await fetch(
                `http://localhost:5050/api/search/courses/${word}`
            );

            if (response.status !== 200) {
                setLoading(false);
                return;
            }

            const data = await response.json();
            setSuggestions(data);
            setLoading(false);
        };

        const timeoutId = setTimeout(() => {
            if (word) fetchData();
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [word]);

    return (
        <div className="search">
            <input
                onChange={handleChange}
                type="text"
                placeholder="Find Course..."
                name="navInput"
                value={word}
            />
            <div className="search__icon">
                <FontAwesomeIcon icon={faSearch} />
            </div>
            <ul className="suggestion-list">
                {loading ? (
                    <li className="no-hover">Searching...</li>
                ) : suggestions.length > 0 ? (
                    suggestions.map((suggestion) => (
                        <Link
                            to={`/course/${suggestion.id}`}
                            onClick={() => setCourseId(suggestion.id)}
                            key={suggestion.id}
                        >
                            <li>{suggestion.title}</li>
                        </Link>
                    ))
                ) : (
                    word.length > 0 && (
                        <li className="no-hover">No results found</li>
                    )
                )}
            </ul>
        </div>
    );
}

export default Search;
