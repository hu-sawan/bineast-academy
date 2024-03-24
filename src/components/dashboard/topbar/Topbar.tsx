import "./Topbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBell,
    faUser,
    faSun,
    faMoon,
} from "@fortawesome/free-regular-svg-icons";
import { faGear, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../../contexts/ThemeContext";

const Topbar = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px",
            }}
            className="topbar"
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "6px",
                    backgroundColor: "var(--secondary-background-color)",
                }}
            >
                <div
                    style={{
                        marginLeft: "16px",
                        flex: 1,
                    }}
                >
                    <input
                        className="topbar__search-input"
                        type="text"
                        placeholder="Search"
                    />
                </div>
                <button style={{ padding: 1 }}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <button onClick={() => toggleTheme()}>
                    {theme === "light" ? (
                        <FontAwesomeIcon icon={faMoon} />
                    ) : (
                        <FontAwesomeIcon icon={faSun} />
                    )}
                </button>
                <button>
                    <FontAwesomeIcon icon={faBell} />
                </button>
                <button>
                    <FontAwesomeIcon icon={faGear} />
                </button>
                <button>
                    <FontAwesomeIcon icon={faUser} />
                </button>
            </div>
        </div>
    );
};

export default Topbar;
