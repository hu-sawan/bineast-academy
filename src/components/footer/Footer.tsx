import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Footer.scss";
import {
    faLinkedinIn,
    faYoutube,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
    const CURRENT_YEAR = new Date().getFullYear();

    return (
        <footer className="aca-footer">
            <div className="aca-footer__separator">
                <hr />
            </div>
            <div className="aca-footer__social">
                <a
                    href="/"
                    className="tooltip bottom"
                    data-tooltip="Youtube"
                    rel="noreferrer"
                >
                    <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a
                    href="https://www.linkedin.com/company/bineast-solutions/"
                    target="_blank"
                    className="tooltip bottom"
                    data-tooltip="LinkedIn"
                    rel="noreferrer"
                >
                    <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
                <a
                    href="/"
                    className="tooltip bottom"
                    data-tooltip="Twitter"
                    rel="noreferrer"
                >
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
            </div>
            <div className="aca-footer__content">
                <p>
                    Copyright &copy; {CURRENT_YEAR} bineast, All right reserved.
                </p>
                <br />
                <p>Contact: bineast2023@gmail.com</p>
                <br />
                <a href="/">Github</a>
            </div>
        </footer>
    );
}

export default Footer;
