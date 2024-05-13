import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../data/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContextType, UserFromDB } from "../types/types";
import { useAccessToken } from "./AccessTokenContext";

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const userContext = useContext(AuthContext);

    if (!userContext)
        throw new Error(
            "Auth context should be used with a auth context provider!"
        );

    return userContext;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const accessToken = useAccessToken();
    const [loading, setLoading] = useState<boolean>(true);
    const [userFullName, setUserFullName] = useState<string>("");
    const updateContext = (newValues: Partial<AuthContextType>) => {
        setContextValue((prevValues) => {
            return {
                ...prevValues,
                ...newValues,
            };
        });
    };

    const [contextValue, setContextValue] = useState<AuthContextType>({
        user: null,
        authContextSuccess: "",
        authContextError: "",
        authContextLoading: false,
        authContextIsDone: false,
        setUserFullName,
        updateContext,
    });

    console.log("context updated", userFullName);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            updateContext({
                authContextError: "",
                authContextSuccess: "",
                authContextIsDone: false,
                authContextLoading: true,
            });
            // If there is an actual user Logged in then proceed with this logic
            if (user) {
                try {
                    // I used a endpoint that I had set up previously to check if a user is already
                    // in the db or he need to be added
                    const response = await fetch(
                        process.env.REACT_APP_API_URL +
                            `/api/users/isFound/${user.uid}`,
                        {
                            method: "GET",
                            headers: {
                                "content-type": "application/json",
                                "x-access-token": accessToken,
                            },
                        }
                    );

                    // If Success then just concat the user object provided by OAuth and
                    // add to it my business logic, the user will then be of localUser type
                    if (response.status === 200) {
                        const userDataResponse = await fetch(
                            process.env.REACT_APP_API_URL +
                                `/api/users/${user.uid}`,
                            {
                                method: "GET",
                                headers: {
                                    "content-type": "application/json",
                                    "x-access-token": accessToken,
                                },
                            }
                        );

                        const [{ id, role, isPremium, fullName }]: [
                            UserFromDB
                        ] = await userDataResponse.json();

                        updateContext({
                            authContextIsDone: true,
                            authContextSuccess: `User found. Redirecting to main page in `,
                            authContextError: "",
                            user: {
                                ...user,
                                displayName: fullName,
                                id,
                                role,
                                isPremium,
                            },
                        });
                        console.log("called 200");
                        setUserFullName("");
                    }

                    // If user was not found in my database then simply add it
                    if (response.status === 404) {
                        updateContext({
                            authContextSuccess: "",
                            authContextError:
                                "User not found. Creating user...",
                        });

                        const response = await fetch(
                            process.env.REACT_APP_API_URL + "/api/users/add",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "x-access-token": accessToken,
                                },
                                body: JSON.stringify({
                                    userId: user.uid,
                                    displayName:
                                        user.displayName || userFullName,
                                    email: user.email,
                                }),
                            }
                        );

                        if (response.status === 201) {
                            console.log("Name", userFullName);
                            updateContext({
                                authContextError: "",
                                authContextSuccess: `User created. Redirecting to main page in `,
                                authContextIsDone: true,
                                user: {
                                    ...user,
                                    displayName:
                                        user.displayName || userFullName,
                                    id: user.uid,
                                    role: "USER",
                                    isPremium: false,
                                },
                            });
                            console.log("called 404");
                            setUserFullName("");
                        } else {
                            auth.signOut();
                            throw new Error(
                                "Something went wrong. Please try again."
                            );
                        }
                    }
                } catch (error) {
                    if (error instanceof Error) {
                        updateContext({
                            authContextError: error.message,
                        });
                        setUserFullName("");
                    } else {
                        updateContext({
                            authContextError: "Unkown error Happened",
                        });
                        setUserFullName("");
                    }
                }
            } else {
                setContextValue((prevValue) => {
                    return {
                        ...prevValue,
                        user: null,
                    };
                });
            }
            setLoading(false);
            updateContext({ authContextLoading: false });
        });

        return unsubscribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider value={contextValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
