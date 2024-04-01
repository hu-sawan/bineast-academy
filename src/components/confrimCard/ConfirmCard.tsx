import { useEffect, useRef } from "react";
import "./ConfirmCard.scss";
import { useTheme } from "../../contexts/ThemeContext";

interface ConfrimCardProps {
    setIsDelete: (state: boolean) => void;
    setIsConfirm: (state: boolean) => void;
    setRefresh: (state: any) => void;
}

function ConfirmCard({ setIsConfirm, setIsDelete }: ConfrimCardProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setIsConfirm(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef, setIsConfirm]);

    return (
        <div className={`confirm-card ${theme}`}>
            <div ref={wrapperRef} className="confirm-card__wrapper">
                <h4>Are you sure?</h4>
                <div className="confirm-card__wrapper__control">
                    <span
                        className="is-easy hover"
                        onClick={() => {
                            setIsDelete(true);
                            setIsConfirm(false);
                        }}
                    >
                        Confirm
                    </span>
                    <span
                        className="is-hard hover"
                        onClick={() => setIsConfirm(false)}
                    >
                        Cancel
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ConfirmCard;
