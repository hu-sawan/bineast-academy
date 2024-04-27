import "./EditVideo.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../../../contexts/ThemeContext";
import { Video } from "../../../types/types";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useAccessToken } from "../../../contexts/AccessTokenContext";
import FileInput from "../fileInput/FileInput";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../loading/Loading";

interface EditVideoProps {
    video: Video;
    isAdding?: boolean;
    setIsEditing: (state: boolean) => void;
    setRefresh: (state: any) => void;
}

function EditVideo({
    video,
    setIsEditing,
    setRefresh,
    isAdding = false,
}: EditVideoProps) {
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();

    const { courseId } = useParams();

    const accessToken = useAccessToken();

    const handleFormSubmit = (values: Video) => {
        const updateVideo = async (values: Video) => {
            try {
                const response = await fetch(
                    process.env.REACT_APP_API_URL + `/api/videos/${video.id}`,
                    {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json",
                            "x-access-token": accessToken,
                        },
                        body: JSON.stringify({
                            ...values,
                            prevOrderNb: video.orderNb,
                        }),
                    }
                );

                if (response.ok) {
                    setRefresh((prev: boolean) => !prev);
                    setIsEditing(false);
                }
            } catch (error) {
                console.log(error);
            }
        };

        // TODO: check implementaion
        const addVideo = async (values: Video) => {
            try {
                setLoading(true);
                const formData = new FormData();
                formData.append("courseId", courseId!);
                formData.append("video", videoFile!);
                formData.append("title", values.title);
                formData.append("description", values.description);

                const response = await fetch(
                    process.env.REACT_APP_API_URL + "/api/videos/add",
                    {
                        method: "POST",
                        headers: {
                            "x-access-token": accessToken,
                        },
                        body: formData,
                    }
                );

                if (response.ok) {
                    setLoading(false);
                    setRefresh((prev: boolean) => !prev);
                    setIsEditing(false);
                }
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
            setLoading(false);
        };

        if (isAdding) addVideo(values);
        else updateVideo(values);
    };

    return (
        <div className={`edit-video ${theme}`}>
            <div className="edit-video__wrapper">
                {loading && (
                    <Loading
                        fill={true}
                        onTop={true}
                        minHeight={false}
                        particlesBackgroundColor="#3e4396"
                        borderRadius="10px"
                        message="Uploading Video Please Don't Close or Refresh This Page"
                    />
                )}
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
                <Formik
                    initialValues={video}
                    onSubmit={handleFormSubmit}
                    validationSchema={checkoutSchema}
                >
                    {({
                        isSubmitting,
                        values,
                        errors,
                        isValid,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                    }) => (
                        <Form
                            className="dashboard-form"
                            onSubmit={handleSubmit}
                        >
                            <div
                                data-error={errors.title ? errors.title : ""}
                                className={`input-wrapper ${
                                    errors.title ? "error" : ""
                                }`}
                            >
                                <label htmlFor="title">Video Title:</label>
                                <Field
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.title ? "error" : ""}
                                    name="title"
                                    type="text"
                                    placeholder="Video Title"
                                />
                            </div>
                            <div
                                className={`input-wrapper ${
                                    errors.description ? "error" : ""
                                }`}
                                data-error={
                                    errors.description ? errors.description : ""
                                }
                            >
                                {/* TODO: replace it with a md editor */}
                                <label htmlFor="description">
                                    Video Description:
                                </label>
                                <Field
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.description ? "error" : ""
                                    }
                                    name="description"
                                    type="text"
                                    placeholder="Video Description"
                                />
                            </div>
                            {!isAdding && (
                                <div className="two-inputs">
                                    <div className="input-wrapper">
                                        <label htmlFor="durationInMinutes">
                                            Duration In Minutes:
                                        </label>
                                        <Field
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="durationInMinutes"
                                            type="text"
                                            disabled
                                        />
                                    </div>
                                    <div
                                        className={`input-wrapper ${
                                            errors.orderNb ? "error" : ""
                                        }`}
                                        data-error={
                                            errors.orderNb ? errors.orderNb : ""
                                        }
                                    >
                                        <label htmlFor="orderNb">
                                            Change Video Order:
                                        </label>
                                        <Field
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="orderNb"
                                            className={
                                                errors.orderNb ? "error" : ""
                                            }
                                            type="text"
                                        />
                                    </div>
                                </div>
                            )}
                            {isAdding && (
                                <FileInput
                                    displayText="upload video"
                                    setFile={setVideoFile}
                                    accept=".mp4, .webm, .ogg, .ogv, .avi, .flv, .mov, .wmv, .mkv, .3gp, .3g2, .m4v, .mpg, .mpeg, .m2v, .m4v, .svi, .divx, .vob, .f4v, .asf, .qt, .m2ts, .mts, .ts, .mxf, .roq, .nsv, .flv, .f4v, .f4p, .f4a, .f4b, .f4r, .f4x, .3gp2, .3gpp, .3gp"
                                />
                            )}
                            <div className="dashboard-form__save">
                                <button
                                    type="submit"
                                    disabled={
                                        !isValid ||
                                        isSubmitting ||
                                        (JSON.stringify({
                                            ...values,
                                            orderNb: parseInt(
                                                values.orderNb.toString()
                                            ),
                                        }) === JSON.stringify(video) &&
                                            (isAdding ? !videoFile : true)) ||
                                        (isAdding ? !videoFile : false)
                                    }
                                >
                                    {isAdding ? "Add" : "Update"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

const checkoutSchema = yup.object().shape({
    title: yup
        .string()
        .max(65, "Title length must not exceed 65 characters")
        .required("Course Title cannot be empty"),
    description: yup.string().required("Required"),
    orderNb: yup
        .number()
        .typeError("Order number must be a number")
        .required("Required"),
});

export default EditVideo;
