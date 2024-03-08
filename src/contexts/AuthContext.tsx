import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../data/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContextType, UserFromDB } from "../types/types";

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
    const [loading, setLoading] = useState<boolean>(true);
    const updateContext = (newValues: Partial<AuthContextType>) => {
        setContextValue((prevValue) => ({
            ...prevValue,
            ...newValues,
        }));
    };

    const [contextValue, setContextValue] = useState<AuthContextType>({
        user: null,
        authContextSuccess: "",
        authContextError: "",
        authContextLoading: false,
        authContextIsDone: false,
        updateContext,
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            contextValue.updateContext({
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
                        `http://localhost:5050/api/users/isFound/${user.uid}`
                    );

                    // If Success then just concat the user object provided by OAuth and
                    // add to it my business logic, the user will then be of localUser type
                    if (response.status === 200) {
                        const userDataResponse = await fetch(
                            `http://localhost:5050/api/users/${user.uid}`
                        );

                        const { isPremium }: UserFromDB =
                            await userDataResponse.json();

                        contextValue.updateContext({
                            authContextIsDone: true,
                            authContextSuccess: `User found. Redirecting to main page in `,
                            authContextError: "",
                            user: { ...user, isPremium: isPremium },
                        });
                    }

                    // If user was not found in my database then simply add it
                    if (response.status === 404) {
                        contextValue.updateContext({
                            authContextSuccess: "",
                            authContextError:
                                "User not found. Creating user...",
                        });

                        const response = await fetch(
                            "http://localhost:5050/api/users/add",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    userId: user.uid,
                                    email: user.email,
                                }),
                            }
                        );

                        if (response.status === 201) {
                            contextValue.updateContext({
                                authContextError: "",
                                authContextSuccess: `User created. Redirecting to main page in `,
                                authContextIsDone: true,
                                user: { ...user, isPremium: false },
                            });
                        } else {
                            auth.signOut();
                            throw new Error(
                                "Something went wrong. Please try again."
                            );
                        }
                    }
                } catch (error) {
                    if (error instanceof Error)
                        contextValue.updateContext({
                            authContextError: error.message,
                        });
                    else
                        contextValue.updateContext({
                            authContextError: "Unkown error Happened",
                        });
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
            contextValue.updateContext({ authContextLoading: false });
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
