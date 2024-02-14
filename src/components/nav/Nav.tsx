import "./Nav.scss";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/logo/DarkThemeLogoLandscape-nobg.png";
import { auth } from "../../data/firebase";
import { useState } from "react";
import Login from "../loginpopup/Login";
import Search from "../search/Search";

function Nav() {
    const user = useAuth();
    const [active, setActive] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handleClose = () => {
        setShowPopup(false);
    };

    return (
        <>
            <nav className="aca-nav">
                <div className="container">
                    <div className="aca-nav__logo">
                        <a href="/">
                            <img src={logo} alt="bineast" />
                        </a>
                    </div>
                    <Search />
                    {user ? (
                        <>
                            <div
                                onClick={() => setActive(!active)}
                                className="aca-nav__profile"
                            >
                                <img
                                    src={user.photoURL || undefined}
                                    alt="user"
                                />
                            </div>
                            <div
                                className={`aca-nav__signout ${
                                    active ? "active" : null
                                }`}
                            >
                                <span onClick={() => auth.signOut()}>
                                    Sign Out
                                </span>
                            </div>
                        </>
                    ) : (
                        <span
                            onClick={() => setShowPopup(!showPopup)}
                            className="aca-nav__login"
                        >
                            <span>Login</span>
                        </span>
                    )}
                </div>
            </nav>
            {showPopup && <Login close={handleClose} />}
        </>
    );
}

export default Nav;
