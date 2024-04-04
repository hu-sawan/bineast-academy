import "./AddInstructor.scss";
import "../../../components/dashboard/editCourse/EditCourse.scss";
import Header from "../../../components/dashboard/header/Header";
import { Field, Formik, Form } from "formik";
import * as yup from "yup";

function AddUser() {
    // TODO: generate id in the backend and check that isPremium is false
    const emptyUser = {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        phoneNumber: "",
        isPremium: false,
    };

    const handleFormSubmit = () => {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    };

    return (
        <div className="dashboard-addInstructor">
            <Header
                title="Add Instructor"
                subtitle="Add a new instructor to the system"
            />

            <Formik
                initialValues={emptyUser}
                onSubmit={handleFormSubmit}
                validationSchema={validationSchema}
            >
                {({
                    isSubmitting,
                    errors,
                    isValid,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <Form className="dashboard-form" onSubmit={handleSubmit}>
                        <div className="dashboard-form__user-form">
                            <div className="two-inputs">
                                <div
                                    data-error={
                                        !!touched.firstName &&
                                        !!errors.firstName
                                            ? errors.firstName
                                            : ""
                                    }
                                    className={`input-wrapper ${
                                        !!touched.firstName &&
                                        !!errors.firstName
                                            ? "error"
                                            : ""
                                    }`}
                                >
                                    <label htmlFor="firstName">
                                        First Name:
                                    </label>
                                    <Field
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            !!touched.firstName &&
                                            !!errors.firstName
                                                ? "error"
                                                : ""
                                        }
                                        name="firstName"
                                        type="text"
                                        placeholder="First Name"
                                    />
                                </div>
                                <div
                                    data-error={
                                        !!touched.lastName && !!errors.lastName
                                            ? errors.lastName
                                            : ""
                                    }
                                    className={`input-wrapper ${
                                        !!touched.lastName && !!errors.lastName
                                            ? "error"
                                            : ""
                                    }`}
                                >
                                    <label htmlFor="lastName">Last Name:</label>
                                    <Field
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            !!touched.lastName &&
                                            !!errors.lastName
                                                ? "error"
                                                : ""
                                        }
                                        name="lastName"
                                        type="text"
                                        placeholder="Last Name"
                                    />
                                </div>
                            </div>
                            <div
                                data-error={
                                    !!touched.email && !!errors.email
                                        ? errors.email
                                        : ""
                                }
                                className={`input-wrapper ${
                                    !!touched.email && !!errors.email
                                        ? "error"
                                        : ""
                                }`}
                            >
                                <label htmlFor="email">Email:</label>
                                <Field
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        !!touched.email && !!errors.email
                                            ? "error"
                                            : ""
                                    }
                                    name="email"
                                    type="text"
                                    placeholder="Email"
                                />
                            </div>
                            <div
                                data-error={
                                    !!touched.phoneNumber &&
                                    !!errors.phoneNumber
                                        ? errors.phoneNumber
                                        : ""
                                }
                                className={`input-wrapper ${
                                    !!touched.phoneNumber &&
                                    !!errors.phoneNumber
                                        ? "error"
                                        : ""
                                }`}
                            >
                                <label htmlFor="phoneNumber">
                                    Phone Number:
                                </label>
                                <Field
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        !!touched.phoneNumber &&
                                        !!errors.phoneNumber
                                            ? "error"
                                            : ""
                                    }
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Phone Number"
                                />
                            </div>
                            <div className="edit-course__wrapper__save">
                                <button
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                >
                                    Add Instructor
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const validationSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Phone Number is Required"),
});

export default AddUser;
