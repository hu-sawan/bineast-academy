import "./Login.scss";
import {
    Auth,
    OAuthProvider,
    getRedirectResult,
    signInWithRedirect,
} from "firebase/auth";
import { auth } from "../../data/firebase";
import googleLogo from "../../assets/providers/google.png";
import { useEffect, useState } from "react";

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

    useEffect(() => {
        setLoading(true);
        // TODO: handle error
        getRedirectResult(auth)
            .then((res) => {
                if (!res) return;
            })
            .catch((error) => {})
            .finally(() => setLoading(false));
    }, []);

    const handleSignInWithProvider = async (
        auth: Auth,
        providerName: SupportedProviders
    ) => {
        const provider = providers[providerName];

        if (!provider) throw new Error(`Unsupported provider ${providerName}`);
        // TODO: handle error
        signInWithRedirect(auth, provider)
            .then(() => {
                close();
            })
            .catch((error) => {
                close();
            });
    };

    return (
        <div className="popup">
            <div className="popup__wrapper">
                <h1>Login</h1>
                <div className="popup__wrapper__providers">
                    <button
                        onClick={() => handleSignInWithProvider(auth, "google")}
                    >
                        <img src={googleLogo} alt="google" /> Google
                    </button>
                </div>
                <span onClick={() => close()} className="popup__close">
                    Cancel
                </span>
            </div>
        </div>
    );
}

export default Login;
