import "./EditCourse.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../../contexts/ThemeContext";
import { Course } from "../../../types/types";
import { Form, Field, Formik } from "formik";
import * as yup from "yup";
import { useAccessToken } from "../../../contexts/AccessTokenContext";
import FileInput from "../fileInput/FileInput";
import { useState } from "react";

interface FormCourse extends Course {
    price: "free" | "premium";
    // TODO: remove those properties
    // visibility: "public" | "private";
}
interface EditCourseProps {
    course: Course;
    setIsEditing: (state: boolean) => void;
    setRefresh: (state: any) => void;
}

function EditCourse({ course, setIsEditing, setRefresh }: EditCourseProps) {
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const { theme } = useTheme();
    const accessToken = useAccessToken();

    const formCourse: FormCourse = {
        ...course,
        level: course.level.toLowerCase() as
            | "beginner"
            | "intermediate"
            | "advanced",
        price: course.isPremium ? "premium" : "free",
        // visibility: "private",
    };

    const handleFormSubmit = (values: FormCourse) => {
        const formData = new FormData();

        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("level", values.level);
        // formData.append("visibility", values.visibility);
        formData.append("price", values.price);
        formData.append("tags", values.tags ?? "");
        formData.append("thumbnail", thumbnail ?? "");

        return new Promise<void>((resolve, reject) => {
            fetch(process.env.REACT_APP_API_URL + "/api/courses/" + course.id, {
                method: "PATCH",
                headers: { "x-access-token": accessToken },
                body: formData,
            })
                .then((response) => {
                    if (response.ok) {
                        setIsEditing(false);
                        resolve();
                        setTimeout(() => {
                            setRefresh((prev: boolean) => !prev);
                        }, 1000);
                    } else {
                        reject(new Error(response.statusText));
                    }
                })
                .catch((error) => {
                    if (error instanceof Error) {
                        reject(error.message);
                    }
                    reject("Something wrong happened while editing course");
                });
        });
    };

    return (
        <div className={`edit-course ${theme}`}>
            <div className="edit-course__wrapper">
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
                    initialValues={formCourse}
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
                                <label htmlFor="title">Course Title:</label>
                                <Field
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.title ? "error" : ""}
                                    name="title"
                                    type="text"
                                    placeholder="Course Title"
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
                                <label htmlFor="description">
                                    Course Description:
                                </label>
                                <Field
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.description ? "error" : ""
                                    }
                                    name="description"
                                    type="text"
                                    placeholder="Course Description"
                                />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="tags">
                                    Tags:{" "}
                                    <span className="addition">
                                        (separated by ' , ')
                                    </span>
                                </label>
                                <Field
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="tags"
                                    type="text"
                                />
                            </div>
                            <div className="three-inputs">
                                <div className="input-wrapper">
                                    <label htmlFor="level">Level:</label>
                                    <Field name="level" as="select">
                                        <option value="beginner">
                                            Beginner
                                        </option>
                                        <option value="advanced">
                                            Advanced
                                        </option>
                                        <option value="intermediate">
                                            Intermediate
                                        </option>
                                    </Field>
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="price">Price</label>
                                    <Field name="price" as="select">
                                        <option value="free">Free</option>
                                        <option value="premium">Premium</option>
                                    </Field>
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="visibility">
                                        Visibility:
                                    </label>
                                    <Field name="visibility" as="select">
                                        <option value="public">Public</option>
                                        <option value="private">Private</option>
                                    </Field>
                                </div>
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
                            </div>
                            <FileInput
                                displayText="choose new thumbnail"
                                setFile={setThumbnail}
                            />
                            <div className="dashboard-form__save">
                                <button
                                    type="submit"
                                    disabled={
                                        !isValid ||
                                        isSubmitting ||
                                        // ! Check again
                                        JSON.stringify({
                                            ...course,
                                            price: course.isPremium
                                                ? "premium"
                                                : "free",
                                        }) === JSON.stringify(values)
                                    }
                                >
                                    Update
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
});

export default EditCourse;
