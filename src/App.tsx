import "./App.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useTheme } from "./contexts/ThemeContext";
import { CourseProvider } from "./contexts/CourseContext";
import Loading from "./components/loading/Loading";
import { useAuth } from "./contexts/AuthContext";
import AccessDenied from "./components/accessDenied/AccessDenied";

const Academy = lazy(() => import("./Academy"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));

// TODO: reduce the number of rerenderes by using memo and useCallback
// TODO: implement lazy loading for all app components
function App() {
    const { theme } = useTheme();
    const { user } = useAuth();

    const html = document.documentElement;

    if (theme === "light") {
        if (html.classList.contains("dark")) html.classList.remove("dark");
        html.classList.add("light");
    } else {
        if (html.classList.contains("light")) html.classList.remove("light");
        html.classList.add("dark");
    }

    return (
        <>
            <BrowserRouter basename="bineast-academy">
                <CourseProvider>
                    <Suspense fallback={<Loading />}>
                        <Routes>
                            <Route
                                path="/dashboard/*"
                                element={
                                    user ? (
                                        user.role.toLowerCase() === "admin" ||
                                        user.role.toLowerCase() ===
                                            "instructor" ? (
                                            <Dashboard />
                                        ) : (
                                            <AccessDenied />
                                        )
                                    ) : (
                                        <Navigate to="/login" replace />
                                    )
                                }
                            />
                            <Route path="/*" element={<Academy />} />
                        </Routes>
                    </Suspense>
                </CourseProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
