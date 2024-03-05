import { AuthProvider } from "./AuthContext";
import { ThemeProvider } from "./ThemeContext";

const AppContextsProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
    );
};

export default AppContextsProvider;
