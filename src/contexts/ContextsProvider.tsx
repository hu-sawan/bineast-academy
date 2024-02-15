import { AuthProvider } from "./AuthContext";
import { ThemeProvider } from "./ThemeContext";

export const ContextsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <AuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
    );
};
