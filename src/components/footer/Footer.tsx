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
                <a href="/" className="tooltip" data-tooltip="Youtube">
                    <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a href="/" className="tooltip" data-tooltip="LinkedIn">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
                <a href="/" className="tooltip" data-tooltip="Twitter">
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
            </div>
            <div className="aca-footer__content">
                <p>
                    Copyright &copy; {CURRENT_YEAR} bineast, All right reserved.
                </p>
                <p>Contact: bineast2023@gmail.com</p>
                <a href="/">Github</a>
            </div>
        </footer>
    );
}

export default Footer;
