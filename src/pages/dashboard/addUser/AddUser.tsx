import "./AddUser.scss";
import Header from "../../../components/dashboard/header/Header";
import { Field, Formik, Form, FormikHelpers } from "formik";
import * as yup from "yup";
import { useAccessToken } from "../../../contexts/AccessTokenContext";
import { useState } from "react";

function AddUser() {
    const [error, setError] = useState<string>("");
    const accessToken = useAccessToken();

    interface User {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
    }

    const emptyUser: User = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
    };

    const handleFormSubmit = (
        values: User,
        { resetForm }: FormikHelpers<User>
    ) => {
        return new Promise<void>((resolve, reject) => {
            setError("");
            const { firstName, lastName, email, phoneNumber } = values;
            const fullName = firstName + " " + lastName;
            fetch(process.env.REACT_APP_API_URL + "/api/users/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": accessToken,
                },
                body: JSON.stringify({ fullName, email, phoneNumber }),
            })
                .then(async (response) => {
                    if (response.ok) {
                        resolve();
                        resetForm();
                    } else {
                        const data = await response.json();

                        throw new Error(data.message);
                    }
                })
                .catch((error) => {
                    if (error instanceof Error) {
                        setError(error.message);
                    } else {
                        setError("Something wrong happened, please try again");
                    }

                    reject();
                });
        });
    };

    return (
        <div className="dashboard-addUser">
            <Header title="Add User" subtitle="Add a new user to the system" />
            <Formik
                initialValues={emptyUser}
                onSubmit={handleFormSubmit}
                validationSchema={validationSchema}
                validateOnMount={true}
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
                        {error && (
                            <div className="dashboard-form__error">{error}</div>
                        )}
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
                            <div className="dashboard-form__save">
                                <button
                                    type="submit"
                                    disabled={
                                        Object.keys(errors).length !== 0 ||
                                        !isValid ||
                                        isSubmitting
                                    }
                                >
                                    Add User
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
    phoneNumber: yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

export default AddUser;
