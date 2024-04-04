import "./EditCourse.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../../contexts/ThemeContext";
import { Course } from "../../../types/types";
import { Form, Field, Formik } from "formik";
import * as yup from "yup";
import { useAccessToken } from "../../../contexts/AccessTokenContext";

interface EditCourseProps {
    course: Course;
    setIsEditing: (state: boolean) => void;
    setRefresh: (state: any) => void;
}

function EditCourse({ course, setIsEditing, setRefresh }: EditCourseProps) {
    const { theme } = useTheme();
    const accessToken = useAccessToken();

    const handleFormSubmit = (values: Course) => {
        return new Promise<void>((resolve, reject) => {
            fetch(process.env.REACT_APP_API_URL + "/api/courses/" + course.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": accessToken,
                },
                body: JSON.stringify(values),
            })
                .then((response) => {
                    if (response.ok) {
                        console.log("Course updated");
                        resolve();
                        setIsEditing(false);
                        setRefresh((prev: boolean) => !prev);
                    } else {
                        reject(new Error("Failed to create course"));
                    }
                })
                .catch((error) => {
                    reject(error);
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
                    initialValues={course}
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
                            <div className="edit-course__wrapper__save">
                                <button
                                    type="submit"
                                    disabled={
                                        !isValid ||
                                        isSubmitting ||
                                        JSON.stringify(course) ===
                                            JSON.stringify(values)
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
