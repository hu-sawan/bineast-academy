import "./Nav.scss";
import { useAuth } from "../../contexts/AuthContext";
import darkLogo from "../../assets/logo/DarkThemeLogoLandscape-nobg.png";
import lightLogo from "../../assets/logo/LightThemeLogoLandscape-nobg.png";
import { auth } from "../../data/firebase";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import Login from "../loginpopup/Login";
import Search from "../search/Search";
import { useTheme } from "../../contexts/ThemeContext";

function Nav() {
    const [active, setActive] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const handleClose = () => {
        setShowPopup(false);
    };

    const handleSignOut = () => {
        auth.signOut();
    };

    return (
        <>
            <nav className="aca-nav">
                <div className="container">
                    <div className="aca-nav__logo">
                        <a href="/bineast-academy">
                            <img
                                src={theme === "dark" ? darkLogo : lightLogo}
                                alt="bineast"
                            />
                        </a>
                    </div>
                    <Search />
                    <div className="aca-nav__control">
                        <FontAwesomeIcon
                            className="aca-nav__control__theme"
                            icon={theme === "light" ? faMoon : faSun}
                            onClick={toggleTheme}
                        />
                        {user ? (
                            <>
                                <div
                                    onClick={() => setActive(!active)}
                                    className="aca-nav__control__profile"
                                >
                                    <img
                                        src={user.photoURL || undefined}
                                        alt="user"
                                    />
                                </div>
                                <div
                                    className={`aca-nav__control__signout ${
                                        active ? "active" : null
                                    }`}
                                >
                                    <span onClick={handleSignOut}>
                                        Sign Out
                                    </span>
                                </div>
                            </>
                        ) : (
                            <span
                                onClick={() => setShowPopup(!showPopup)}
                                className="aca-nav__control__login"
                            >
                                <span>Login</span>
                            </span>
                        )}
                    </div>
                </div>
            </nav>
            {showPopup && <Login close={handleClose} />}
        </>
    );
}

export default Nav;
