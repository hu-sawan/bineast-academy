import "./Login.scss";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../data/firebase";

interface Props {
    close: () => void;
}

function Login({ close }: Props) {
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: "popup",
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: "/bineast-academy",
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            {
                provider: GoogleAuthProvider.PROVIDER_ID,
                customParameters: {
                    // Forces account selection even when one account
                    // is available.
                    prompt: "select_account",
                },
                providerName: "Google",
            },
        ],
    };
    return (
        <div className="popup">
            <div className="popup-wrapper">
                <h1>Login</h1>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
                <span onClick={() => close()} className="popup-close">
                    Cancel
                </span>
            </div>
        </div>
    );
}

export default Login;
