import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCourse } from "../../contexts/CourseContext";
import { useTheme } from "../../contexts/ThemeContext";

interface SuggestionsInterface {
    id: string;
    title: string;
}

interface SearchProps {
    className?: "mobile";
}

function Search({ className }: SearchProps) {
    const { setCourseId } = useCourse();
    const [word, setWord] = useState<string>("");
    const [suggestions, setSuggestions] = useState<SuggestionsInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // To show/hide the suggestion list on small screens
    const [active, setActive] = useState<boolean>(false);
    const { isSmallScreen } = useTheme();

    const searchRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value);
        if (word.length === 0) {
            setSuggestions([]);
            setLoading(false);
        }
    };

    // Fetching the suggestions from the server
    useEffect(() => {
        if (word) {
            setLoading(true);
        } else {
            setLoading(false);
            setSuggestions([]);
        }

        const fetchData = async () => {
            try {
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
            } catch (error) {}
            setLoading(false);
        };

        const timeoutId = setTimeout(() => {
            if (word) fetchData();
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [word]);

    // To hide the suggestion list when clicked outside
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(e.target as Node)
            ) {
                setSuggestions([]);
                setWord("");
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    const handleClick = () => {
        setActive(!active);
    };

    return (
        <div
            className={`search ${className} ${
                isSmallScreen && (active ? "show" : "hide")
            }`}
            ref={searchRef}
        >
            <input
                onChange={handleChange}
                type="text"
                placeholder="Find Course..."
                name="navInput"
                autoComplete="off"
                value={word}
            />
            <div className="search__icon" onClick={handleClick}>
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
