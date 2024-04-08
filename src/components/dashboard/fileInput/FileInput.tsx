import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

interface FileInputProps {
    displayText: string;
    setFile: (file: File) => void;
}

function FileInput({ displayText, setFile }: FileInputProps) {
    const messageRef = useRef<HTMLDivElement>(null);
    return (
        <div className="input-wrapper contain-file">
            <label htmlFor="file-input">
                <FontAwesomeIcon icon={faArrowUpFromBracket} />
                <span>{displayText}</span>
            </label>
            <input
                className="file-input"
                id="file-input"
                type="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => {
                    messageRef.current!.innerText = e.target.files![0].name;
                    setFile(e.target.files![0]);
                }}
            />
            <div ref={messageRef} className="message"></div>
        </div>
    );
}

export default FileInput;
