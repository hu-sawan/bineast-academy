import "./Nav.scss";
import { useAuth } from "../../contexts/AuthContext";
import darkLogo from "../../assets/logo/DarkThemeLogoLandscape-nobg.png";
import lightLogo from "../../assets/logo/LightThemeLogoLandscape-nobg.png";
import { auth } from "../../data/firebase";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSun,
    faMoon,
    faStar,
    faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import Search from "../search/Search";
import Login from "../loginpopup/Login";
import { useTheme } from "../../contexts/ThemeContext";
import { useAccessToken } from "../../contexts/AccessTokenContext";
import { NavLink } from "react-router-dom";
import TextImage from "../textImage/TextImage";

function Nav() {
    const [active, setActive] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const { user } = useAuth();
    const { theme, isSmallScreen, toggleTheme } = useTheme();
    const accessToken = useAccessToken();

    const handleClose = () => {
        setShowPopup(false);
    };

    const handleSignOut = () => {
        auth.signOut();
    };

    const handleSubscribeClick = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/subscribe`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": accessToken,
                    },
                    body: JSON.stringify({
                        userId: user?.uid,
                    }),
                }
            );

            const data = await response.json();

            if (response.status !== 200) throw Error(data.message);

            window.location.href = data.url;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <nav className="aca-nav">
                {isSmallScreen && <Search className="mobile" />}
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
                        {user &&
                            (user.role.toLowerCase() === "admin" ||
                                user.role.toLowerCase() === "instructor") && (
                                <NavLink
                                    data-tooltip="Go to Dashboard"
                                    to="/dashboard"
                                    className="aca-nav__control__dashboard tooltip bottom"
                                >
                                    <FontAwesomeIcon
                                        icon={faUpRightFromSquare}
                                    />
                                </NavLink>
                            )}
                        {user && !user.isPremium ? (
                            <div
                                className="aca-nav__control__subscription tooltip bottom"
                                onClick={handleSubscribeClick}
                                data-tooltip="Become premium member"
                            >
                                <FontAwesomeIcon icon={faStar} />
                            </div>
                        ) : null}
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
                                    {user.photoURL === undefined ? (
                                        <img src={user.photoURL} alt="user" />
                                    ) : (
                                        <TextImage
                                            text={
                                                user && user.displayName
                                                    ? user.displayName
                                                    : "Uknown User"
                                            }
                                        />
                                    )}
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
