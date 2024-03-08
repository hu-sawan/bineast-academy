import "./Login.scss";
import { Auth, OAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../data/firebase";
import googleLogo from "../../assets/providers/google.png";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import { useAuth } from "../../contexts/AuthContext";

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
                <div className="popup__wrapper__providers">
                    <button
                        onClick={() => handleSignInWithProvider(auth, "google")}
                        disabled={authContextLoading || authContextIsDone}
                    >
                        <img src={googleLogo} alt="google" />{" "}
                        <div>
                            {authContextLoading ? (
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
                    disabled={authContextLoading}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default Login;
