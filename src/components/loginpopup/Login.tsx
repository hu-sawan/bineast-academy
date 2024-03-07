import "./Login.scss";
import { Auth, OAuthProvider, User, signInWithPopup } from "firebase/auth";
import { auth } from "../../data/firebase";
import googleLogo from "../../assets/providers/google.png";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";

type SupportedProviders = "google" | "facebook" | "github";

const providers: Record<SupportedProviders, OAuthProvider> = {
    google: new OAuthProvider("google.com"),
    facebook: new OAuthProvider("facebook.com"),
    github: new OAuthProvider("github.com"),
};

interface Props {
    close: () => void;
}

function Login({ close }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [counter, setCounter] = useState<number>(5);

    // isDone can be used for both to represent error or success messages but now we will only use it with success
    const [isDone, setIsDone] = useState<boolean>(false);

    // To avoid the counter to get decremented when the component is rendered we keep track of isMount
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        const time = setTimeout(() => setError(""), 15000);

        return () => clearTimeout(time);
    }, [error]);

    useEffect(() => {
        const time = setTimeout(() => setSuccess(""), 15000);

        return () => clearTimeout(time);
    }, [success]);

    useEffect(() => {
        setIsMounted(true);

        let interval: NodeJS.Timer;

        if (isMounted && isDone) {
            interval = setInterval(() => {
                setCounter((prevCounter) => prevCounter - 1);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isDone, isMounted]);

    useEffect(() => {
        if (counter === 0) close();
    }, [counter, close]);

    const handleSignInWithProvider = async (
        auth: Auth,
        providerName: SupportedProviders
    ) => {
        setError("");
        setLoading(true);
        const provider = providers[providerName];
        provider.setCustomParameters({
            login_hint: "hello@gmail.com",
        });

        if (!provider) throw new Error(`Unsupported provider ${providerName}`);

        signInWithPopup(auth, provider)
            .then(async (result) => {
                const user: User = result.user;

                if (user) {
                    const response = await fetch(
                        `http://localhost:5050/api/users/isFound/${user.uid}`
                    );

                    if (response.status === 200) {
                        setError("");
                        setSuccess(`User found. Redirecting to main page in `);
                        setIsDone(true);
                    }

                    if (response.status === 404) {
                        setSuccess("");
                        setError("User not found. Creating user...");

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
                                    role: "USER",
                                }),
                            }
                        );

                        if (response.status === 201) {
                            setError("");
                            setSuccess(
                                `User created. Redirecting to main page in `
                            );
                            setIsDone(true);
                        } else
                            throw new Error(
                                "Something went wrong. Please try again."
                            );
                    }
                }
                setLoading(false);
            })
            .catch((error) => {
                if (error.code === "auth/popup-closed-by-user") {
                    setError("Popup closed by user. Please try again.");
                } else if (error.code === "auth/user-cancelled") {
                    setError("Operation Canceled. Please try again.");
                } else {
                    setError("Something went wrong. Please try again.");
                }

                console.log("ERROR CAUGHT");

                setLoading(false);
            });
    };

    return (
        <div className="popup">
            <div className="popup__wrapper">
                <h1>Login</h1>
                {error && <p className="error">{error}</p>}
                {success && (
                    <p className="success">
                        {success + (isDone ? counter : null)}
                    </p>
                )}
                <div className="popup__wrapper__providers">
                    <button
                        onClick={() => handleSignInWithProvider(auth, "google")}
                        disabled={loading || isDone}
                    >
                        <img src={googleLogo} alt="google" />{" "}
                        <div>
                            {loading ? (
                                <Loading position="relative" size="small" />
                            ) : (
                                "Google"
                            )}
                        </div>
                    </button>
                </div>
                <button
                    onClick={() => close()}
                    className="popup__close"
                    disabled={loading}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default Login;
