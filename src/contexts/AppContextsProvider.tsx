import { AuthProvider } from "./AuthContext";
import { ThemeProvider } from "./ThemeContext";
import { AccessTokenProvider } from "./AccessTokenContext";

const AppContextsProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <AccessTokenProvider>
            <AuthProvider>
                <ThemeProvider>{children}</ThemeProvider>
            </AuthProvider>
        </AccessTokenProvider>
    );
};

export default AppContextsProvider;
