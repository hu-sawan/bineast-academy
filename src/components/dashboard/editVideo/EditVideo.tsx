import "./EditVideo.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../../../contexts/ThemeContext";

interface EditVideoProps {
    video: any;
    setIsEditing: (state: boolean) => void;
    setRefresh: (state: any) => void;
}

function EditVideo({ video, setIsEditing, setRefresh }: EditVideoProps) {
    const { theme } = useTheme();
    return (
        <div className={`edit-video ${theme}`}>
            <div className="edit-video__wrapper">
                <span
                    data-tooltip="Cancel"
                    className="tooltip bottom cancel"
                    onClick={() => setIsEditing(false)}
                >
                    <FontAwesomeIcon
                        style={{ display: "block" }}
                        icon={faXmark}
                    />
                </span>
            </div>
        </div>
    );
}

export default EditVideo;
