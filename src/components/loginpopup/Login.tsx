import "./Login.scss";
import {
    Auth,
    OAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../data/firebase";
import googleLogo from "../../assets/providers/google.png";
import { FormEvent, useEffect, useState } from "react";
import Loading from "../loading/Loading";
import { useAuth } from "../../contexts/AuthContext";
import { FirebaseError } from "firebase/app";

type SupportedProviders = "google" | "facebook" | "github";

const providers: Record<SupportedProviders, OAuthProvider> = {
    google: new OAuthProvider("google.com"),
    facebook: new OAuthProvider("facebook.com"),
    github: new OAuthProvider("github.com"),
};

interface LoginProps {
    close: () => void;
}

function Login({ close }: LoginProps) {
    const [signup, setSignup] = useState(false);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [counter, setCounter] = useState<number>(5);

    const {
        authContextLoading,
        authContextError,
        authContextSuccess,
        authContextIsDone,
        updateContext,
    } = useAuth();

    // To avoid the counter to get decremented when the component is rendered we keep track of isMount
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        const time = setTimeout(
            () => updateContext({ authContextError: "" }),
            15000
        );

        return () => clearTimeout(time);
    }, [authContextError, updateContext]);

    useEffect(() => {
        const time = setTimeout(
            () => updateContext({ authContextSuccess: "" }),
            15000
        );

        return () => clearTimeout(time);
    }, [authContextSuccess, updateContext]);

    useEffect(() => {
        setIsMounted(true);

        let interval: NodeJS.Timer;

        if (isMounted && authContextIsDone) {
            interval = setInterval(() => {
                setCounter((prevCounter) => prevCounter - 1);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [authContextIsDone, isMounted]);

    useEffect(() => {
        if (counter === 0) {
            updateContext({ authContextIsDone: false });
            close();
        }
    }, [counter, close, updateContext]);

    useEffect(() => {
        return () => {
            updateContext({
                authContextSuccess: "",
                authContextError: "",
                authContextLoading: false,
                authContextIsDone: false,
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSignInWithProvider = async (
        auth: Auth,
        providerName: SupportedProviders
    ) => {
        updateContext({
            authContextLoading: true,
        });
        const provider = providers[providerName];
        if (!provider) throw new Error(`Unsupported provider ${providerName}`);

        signInWithPopup(auth, provider).catch((error) => {
            if (error.code === "auth/popup-closed-by-user") {
                updateContext({
                    authContextError: "Popup closed by user. Please try again.",
                });
            } else if (error.code === "auth/user-cancelled") {
                updateContext({
                    authContextError: "Operation Canceled. Please try again.",
                });
            } else {
                updateContext({
                    authContextError: "Uknown error. Please try again.",
                });
            }

            updateContext({ authContextLoading: false });
        });
    };

    const handleLoginWithEmailPassword = async (
        auth: Auth,
        email: string,
        password: string
    ) => {
        updateContext({
            authContextLoading: true,
        });

        try {
            if (email === "" || password === "")
                throw new Error("Please fill in all fields.");
            console.log("email: ", email, "password: ", password);
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            if (error instanceof FirebaseError) {
                if (error.code === "auth/invalid-credential") {
                    updateContext({
                        authContextError:
                            "Invalid Email/Password. Please try again.",
                    });
                } else if (error.code === "auth/wrong-password") {
                    updateContext({
                        authContextError: "Wrong password. Please try again.",
                    });
                } else {
                    updateContext({
                        authContextError: "Uknown error. Please try again.",
                    });
                }
            }
        }
        updateContext({ authContextLoading: false });
    };

    if (signup) {
        return <SignupCard close={close} setSignup={setSignup} />;
    }

    return (
        <div className="popup">
            <div className="popup__wrapper">
                <h1>Login</h1>
                {authContextError && (
                    <p className="error">{authContextError}</p>
                )}
                {authContextSuccess && (
                    <p className="success">
                        {authContextSuccess +
                            (authContextIsDone ? counter : null)}
                    </p>
                )}
                <form
                    onSubmit={(e: FormEvent) => {
                        e.preventDefault();
                        handleLoginWithEmailPassword(auth, email, password);
                    }}
                >
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={authContextLoading}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={authContextLoading}
                        required
                    />
                    <div className="popup__wrapper__buttons">
                        <button type="submit" disabled={authContextLoading}>
                            {authContextLoading ? (
                                <Loading
                                    position="relative"
                                    size="small"
                                    minHeight={false}
                                />
                            ) : (
                                "Login"
                            )}
                        </button>
                        <span>
                            New here?{" "}
                            <span
                                onClick={() => {
                                    setSignup(true);
                                }}
                            >
                                Sign up
                            </span>
                        </span>
                    </div>
                </form>
                <div className="separator"></div>
                <div className="popup__wrapper__providers">
                    <button
                        onClick={() => handleSignInWithProvider(auth, "google")}
                        disabled={authContextLoading || authContextIsDone}
                    >
                        <img src={googleLogo} alt="google" />{" "}
                        <div>
                            {authContextLoading ? (
                                <Loading
                                    position="relative"
                                    size="small"
                                    minHeight={false}
                                />
                            ) : (
                                "Google"
                            )}
                        </div>
                    </button>
                </div>
                <button
                    onClick={() => close()}
                    className="popup__close"
                    disabled={authContextLoading}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

interface SignupCardProps extends LoginProps {
    setSignup: (signup: boolean) => void;
}

const SignupCard = ({ close, setSignup }: SignupCardProps) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");

    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(5);

    const {
        authContextLoading,
        authContextError,
        authContextSuccess,
        authContextIsDone,
        setUserFullName,
        updateContext,
    } = useAuth();

    useEffect(() => {
        setIsMounted(true);

        let interval: NodeJS.Timer;

        if (isMounted && authContextIsDone) {
            interval = setInterval(() => {
                setCounter((prevCounter) => prevCounter - 1);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [authContextIsDone, isMounted]);

    const createUser = async (
        auth: Auth,
        email: string,
        password: string,
        userFullName: string
    ) => {
        console.log(userFullName);
        updateContext({
            authContextLoading: true,
        });
        setUserFullName(userFullName);
        console.log("End");

        try {
            if (email === "" || password === "")
                throw new Error("Please fill in all fields.");
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            if (error instanceof FirebaseError) {
                if (error.code === "auth/email-already-in-use") {
                    updateContext({
                        authContextError:
                            "Email already in use. Please try again.",
                    });
                } else {
                    updateContext({
                        authContextError: "Unknown error. Please try again.",
                    });
                }
            }
        }
        updateContext({ authContextLoading: false });
    };

    return (
        <div className="popup">
            <div className="popup__wrapper">
                <h1>Create New Account</h1>
                {authContextError && (
                    <p className="error">{authContextError}</p>
                )}
                {authContextSuccess && (
                    <p className="success">
                        {authContextSuccess +
                            (authContextIsDone ? counter : null)}
                    </p>
                )}
                <form
                    onSubmit={(e: FormEvent) => {
                        e.preventDefault();
                        createUser(auth, email, password, fullName);
                    }}
                >
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        disabled={authContextLoading}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={authContextLoading}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={authContextLoading}
                        required
                    />
                    <div className="popup__wrapper__buttons">
                        <button type="submit" disabled={authContextLoading}>
                            {authContextLoading ? (
                                <Loading
                                    position="relative"
                                    size="small"
                                    minHeight={false}
                                />
                            ) : (
                                "Sign up"
                            )}
                        </button>
                        <span>
                            Have Account?{" "}
                            <span onClick={() => setSignup(false)}>Login</span>
                        </span>
                    </div>
                </form>
                <button
                    onClick={() => close()}
                    className="popup__close"
                    disabled={authContextLoading}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Login;
