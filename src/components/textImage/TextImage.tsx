import "./TextImage.scss";

// Function to generate random color
function randomColor(): string {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

interface TextImageProps {
    text: string;
}

function TextImage({ text }: TextImageProps) {
    const textArray = text.split(" ");
    const textToDisplay =
        textArray.length < 2
            ? `${textArray[0][0]}`
            : `${textArray[0][0] + textArray[1][0]}`;

    const color = randomColor();

    return (
        <div
            className="generated-image__wrapper"
            style={{
                backgroundColor: color ? color : "#00ff55",
            }}
        >
            {textToDisplay}
        </div>
    );
}

export default TextImage;
